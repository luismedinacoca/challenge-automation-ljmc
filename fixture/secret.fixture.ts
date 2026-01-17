import { test as base, expect } from '@playwright/test';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

enum TestEnv {
  DEV = 'dev',
  QA = 'qa',
  STG = 'stg',
  CERT = 'cert',
  PROD = 'prod',
}

interface SecretFixtures {
  encryptedSecret: string;
}

type TestTime = {
  start: Date;
  end?: Date;
};

export const test = base.extend<SecretFixtures>({
  encryptedSecret: [
    async ({ }, use) => {
      const env = (process.env.TEST_ENV as TestEnv) || TestEnv.QA;

      let secret: string | undefined;

      if (env === TestEnv.DEV) {
        secret = process.env.DEV_SECRET_KEY;
      }

      if (env === TestEnv.QA) {
        secret = process.env.QA_SECRET_KEY;
      }

      if (env === TestEnv.STG) {
        secret = process.env.STG_SECRET_KEY;
      }

      if (env === TestEnv.CERT) {
        secret = process.env.CERT_SECRET_KEY;
      }

      if (env === TestEnv.PROD) {
        secret = process.env.PROD_SECRET_KEY;
      }

      if (!secret) {
        throw new Error(`Secret key not defined for environment: ${env}`);
      }

      const encrypted = crypto
        .createHash('sha256')
        .update(secret)
        .digest('hex');

      console.log(`[${env.toUpperCase()}] Encrypted Secret:`, encrypted);

      await use(encrypted);
    },
    { scope: 'worker' }
  ],

  /* ⏱️ Timing (test scope) */
  testTime: async ({ }, use, testInfo) => {
    const time: TestTime = {
      start: new Date(),
    };

    console.log(`\n🟢 [${testInfo.title} - Inicio: ${time.start.toISOString()}]`);

    await use(time);

    time.end = new Date();

    console.log(`🔴 [${testInfo.title} - Fin: ${time.end.toISOString()}]`);
    console.log(`⌛ [${testInfo.title} -Duración: ${time.end.getTime() - time.start.getTime()} ms]`);
  },
});

export { expect };