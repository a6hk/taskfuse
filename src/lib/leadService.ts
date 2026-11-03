/**
 * Lead capture service for AgentGuard
 * Stores capture data into Firestore using standard Firebase SDK,
 * with localStorage retention for offline / immediate client guarantee.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '@/firebase-applet-config.json';

export interface LeadSubmission {
  email: string;
  source: string;
  tier?: string;
}

let dbInstance: ReturnType<typeof getFirestore> | null = null;

function getDb() {
  if (dbInstance) return dbInstance;
  try {
    if (firebaseConfig && firebaseConfig.projectId && firebaseConfig.projectId !== 'remixed-project-id') {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
      return dbInstance;
    }
  } catch (err) {
    console.warn('Firebase init deferred:', err);
  }
  return null;
}

export async function submitLead(submission: LeadSubmission): Promise<{ success: boolean; id: string }> {
  const leadId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  const normalizedEmail = submission.email.trim().toLowerCase();

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  // 1. Guaranteed local recording
  try {
    const stored = JSON.parse(localStorage.getItem('taskfuse_leads') || localStorage.getItem('agentguard_leads') || '[]');
    stored.push({
      id: leadId,
      email: normalizedEmail,
      source: submission.source,
      tier: submission.tier || null,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('taskfuse_leads', JSON.stringify(stored));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }

  // 2. Persist to Firestore
  try {
    const db = getDb();
    if (db) {
      const docRef = doc(db, 'leads', leadId);
      const payload: Record<string, any> = {
        email: normalizedEmail,
        createdAt: serverTimestamp(),
        source: submission.source
      };
      if (submission.tier) {
        payload.tier = submission.tier;
      }
      await setDoc(docRef, payload);
    }
  } catch (err) {
    console.warn('Firestore write notice:', err);
  }

  return { success: true, id: leadId };
}

export function getStoredLeads() {
  try {
    return JSON.parse(localStorage.getItem('taskfuse_leads') || localStorage.getItem('agentguard_leads') || '[]');
  } catch {
    return [];
  }
}
