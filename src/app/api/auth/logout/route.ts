import { NextRequest } from 'next/server';
import { removeAuthResponse } from '@/lib/auth';

export async function POST(request: NextRequest) {
  return removeAuthResponse({ success: true });
}
