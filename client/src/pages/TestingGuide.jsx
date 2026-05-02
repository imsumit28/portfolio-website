import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const TestingGuide = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-5">
      <div className="container py-4" style={{ maxWidth: '900px' }}>
        {/* Back button */}
        <button
          className="btn-global btn-global-secondary btn-global-sm mb-4"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft /> Back
        </button>

        {/* Header */}
        <div className="section-title-wrapper mb-2" data-aos="fade-right">
          <h2 className="section-title" style={{ minWidth: 'max-content', paddingRight: '20px' }}>
            TESTING GUIDE
          </h2>
          <div className="section-line"></div>
        </div>
        <p className="mb-5" style={{ color: '#94a3b8', fontSize: '0.97rem' }}>
          Comprehensive unit and integration tests for authentication, documents, comments, and WebSocket synchronization.
        </p>

        {/* Content */}
        <div style={{ color: '#cbd5e1', lineHeight: '1.8' }}>
          {/* Quick Start */}
          <section className="mb-5">
            <h4 style={{ color: '#f8fafc', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '700' }}>
              Quick Start
            </h4>
            <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '1.5rem' }}>
              <h5 style={{ color: '#10b981', marginBottom: '0.8rem', fontSize: '1.05rem' }}>Install dependencies</h5>
              <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '6px', overflow: 'auto', color: '#e2e8f0', marginBottom: '1.5rem' }}>
                npm install{'\n'}cd server && npm install
              </pre>

              <h5 style={{ color: '#10b981', marginBottom: '0.8rem', fontSize: '1.05rem' }}>Run tests</h5>
              <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '6px', overflow: 'auto', color: '#e2e8f0', marginBottom: '1.5rem' }}>
{`# Run all tests with coverage
npm run test --workspace=server

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch --workspace=server

# Run specific test file
npm run test -- src/__tests__/routes/auth.test.ts`}
              </pre>

              <h5 style={{ color: '#10b981', marginBottom: '0.8rem', fontSize: '1.05rem' }}>Check coverage</h5>
              <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '6px', overflow: 'auto', color: '#e2e8f0' }}>
{`After running tests, coverage report appears in terminal:

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------|---------|----------|---------|---------|-------------------
All files  |   62.5  |   58.2   |   60.1  |   61.8  |
 routes/   |   75.2  |   72.5   |   78.3  |   76.1  |
 socket/   |   45.3  |   42.1   |   48.5  |   44.9  | 12-25, 45
-----------|---------|----------|---------|---------|-------------------
Coverage HTML report: server/coverage/lcov-report/index.html`}
              </pre>
            </div>
          </section>

          {/* Test Structure */}
          <section className="mb-5">
            <h4 style={{ color: '#f8fafc', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '700' }}>
              Test Structure
            </h4>
            <pre style={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', padding: '1.5rem', borderRadius: '8px', overflow: 'auto', color: '#e2e8f0' }}>
{`server/src/__tests__/
├── setup.ts                      # Jest setup (env vars, mocks)
├── helpers.ts                    # Test utilities (createTestUser, etc)
├── api-docs.test.ts             # API documentation tests
├── routes/
│   ├── auth.test.ts             # Authentication endpoints
│   ├── documents.test.ts         # Document CRUD + sharing
│   └── comments.test.ts          # Comments and replies
└── socket/
    └── sync.test.ts             # WebSocket + Y.js CRDT sync`}
            </pre>
          </section>

          {/* Coverage Goals */}
          <section className="mb-5">
            <h4 style={{ color: '#f8fafc', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '700' }}>
              Test Coverage Goals
            </h4>
            <p style={{ marginBottom: '1rem' }}>Target: <strong style={{ color: '#10b981' }}>60%+ coverage</strong> on critical paths</p>
            <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '1.5rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1', fontSize: '0.95rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(16,185,129,0.3)' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#10b981', fontWeight: '700' }}>Module</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem', color: '#10b981', fontWeight: '700' }}>Current</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem', color: '#10b981', fontWeight: '700' }}>Target</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', color: '#10b981', fontWeight: '700' }}>Coverage Includes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem' }}>Auth routes</td>
                    <td style={{ textAlign: 'center', padding: '0.75rem' }}>~75%</td>
                    <td style={{ textAlign: 'center', padding: '0.75rem' }}>80%</td>
                    <td style={{ padding: '0.75rem' }}>signup, login, logout, refresh, JWT</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem' }}>Document routes</td>
                    <td style={{ textAlign: 'center', padding: '0.75rem' }}>~72%</td>
                    <td style={{ textAlign: 'center', padding: '0.75rem' }}>75%</td>
                    <td style={{ padding: '0.75rem' }}>CRUD, sharing, permissions, trash</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem' }}>Comment routes</td>
                    <td style={{ textAlign: 'center', padding: '0.75rem' }}>~65%</td>
                    <td style={{ textAlign: 'center', padding: '0.75rem' }}>70%</td>
                    <td style={{ padding: '0.75rem' }}>create, reply, resolve</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>WebSocket</td>
                    <td style={{ textAlign: 'center', padding: '0.75rem' }}>~45%</td>
                    <td style={{ textAlign: 'center', padding: '0.75rem' }}>60%</td>
                    <td style={{ padding: '0.75rem' }}>sync, CRDT, offline merge</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Writing Tests */}
          <section className="mb-5">
            <h4 style={{ color: '#f8fafc', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '700' }}>
              Writing Tests
            </h4>

            <h5 style={{ color: '#10b981', marginBottom: '0.8rem', fontSize: '1.05rem' }}>1. Auth Flow Test Example</h5>
            <pre style={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', padding: '1rem', borderRadius: '6px', overflow: 'auto', color: '#e2e8f0', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
{`describe('POST /signup', () => {
  it('should create user with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123',
        displayName: 'Test User',
      });

    expect(res.status).toBe(201);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.user.email).toBe('test@example.com');
  });
});`}
            </pre>

            <h5 style={{ color: '#10b981', marginBottom: '0.8rem', fontSize: '1.05rem' }}>2. Permission Test Example</h5>
            <pre style={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', padding: '1rem', borderRadius: '6px', overflow: 'auto', color: '#e2e8f0', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
{`describe('Document access control', () => {
  it('owner should read document', async () => {
    const res = await request(app)
      .get(\`/api/documents/\${doc._id}\`)
      .set('Authorization', \`Bearer \${user1Token}\`);

    expect(res.status).toBe(200);
    expect(res.body.permission).toBe('owner');
  });
});`}
            </pre>

            <h5 style={{ color: '#10b981', marginBottom: '0.8rem', fontSize: '1.05rem' }}>3. WebSocket Sync Test Example</h5>
            <pre style={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', padding: '1rem', borderRadius: '6px', overflow: 'auto', color: '#e2e8f0', fontSize: '0.85rem' }}>
{`describe('Y.js CRDT Sync', () => {
  it('should resolve concurrent edits', () => {
    const doc1 = new Y.Doc();
    const doc2 = new Y.Doc();
    const text1 = doc1.getText('content');
    const text2 = doc2.getText('content');

    text1.insert(0, 'Hello');
    text2.insert(0, 'Hi ');

    Y.applyUpdate(doc1, Y.encodeStateAsUpdate(doc2));

    expect(text1.toString()).toEqual(text2.toString());
  });
});`}
            </pre>
          </section>

          {/* Best Practices */}
          <section className="mb-5">
            <h4 style={{ color: '#f8fafc', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '700' }}>
              Best Practices
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '1.5rem' }}>
                <h5 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1rem' }}>✓ Do</h5>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Test behavior, not implementation</li>
                  <li style={{ marginBottom: '0.5rem' }}>Use meaningful test names</li>
                  <li style={{ marginBottom: '0.5rem' }}>Isolate tests — no test order dependency</li>
                  <li style={{ marginBottom: '0.5rem' }}>Clean up after tests</li>
                  <li style={{ marginBottom: '0.5rem' }}>Test error cases</li>
                  <li>Mock external services</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '1.5rem' }}>
                <h5 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1rem' }}>✗ Don't</h5>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Test framework behavior</li>
                  <li style={{ marginBottom: '0.5rem' }}>Use hardcoded IDs</li>
                  <li style={{ marginBottom: '0.5rem' }}>Depend on test order</li>
                  <li style={{ marginBottom: '0.5rem' }}>Make tests too specific</li>
                  <li style={{ marginBottom: '0.5rem' }}>Test implementation details</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section>
            <h4 style={{ color: '#f8fafc', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '700' }}>
              Next Steps
            </h4>
            <ol style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Install dependencies: <code style={{ background: '#0f172a', padding: '2px 6px', borderRadius: '4px', color: '#10b981' }}>npm install</code></li>
              <li style={{ marginBottom: '0.5rem' }}>Run tests: <code style={{ background: '#0f172a', padding: '2px 6px', borderRadius: '4px', color: '#10b981' }}>npm run test --workspace=server</code></li>
              <li style={{ marginBottom: '0.5rem' }}>Check coverage: Review HTML report in <code style={{ background: '#0f172a', padding: '2px 6px', borderRadius: '4px', color: '#10b981' }}>server/coverage/</code></li>
              <li>Add more tests following the pattern</li>
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
};

export default TestingGuide;
