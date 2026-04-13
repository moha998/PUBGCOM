import React, { useState } from 'react';
import { 
  loginWithGoogle, 
  loginWithEmail, 
  registerWithEmail, 
  logout 
} from './firebase-config'; // تأكد من أن المسار يشير إلى ملف الإعدادات الذي أرسلته لي

const AuthModal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // دالة تسجيل الدخول بالبريد
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
        alert('تم إنشاء الحساب بنجاح!');
      } else {
        await loginWithEmail(email, password);
        // سيتم تحديث حالة المستخدم تلقائياً عبر onAuthStateChanged
      }
    } catch (err: any) {
      let message = 'حدث خطأ ما';
      if (err.code === 'auth/user-not-found') message = 'المستخدم غير موجود';
      if (err.code === 'auth/wrong-password') message = 'كلمة المرور خاطئة';
      if (err.code === 'auth/email-already-in-use') message = 'البريد الإلكتروني مستخدم بالفعل';
      if (err.code === 'auth/invalid-email') message = 'البريد الإلكتروني غير صالح';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // دالة تسجيل الدخول بجوجل
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError('فشل تسجيل الدخول بواسطة Google');
    }
  };

  return (
    <div className="auth-container" style={{
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '2rem',
      borderRadius: '12px',
      maxWidth: '400px',
      margin: 'auto',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>{isRegistering ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setIsRegistering(false)}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: !isRegistering ? '#d4af37' : 'transparent',
            border: '1px solid #d4af37',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >تسجيل دخول</button>
        <button 
          onClick={() => setIsRegistering(true)}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: isRegistering ? '#d4af37' : 'transparent',
            border: '1px solid #d4af37',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >إنشاء حساب</button>
      </div>

      <form onSubmit={handleEmailAuth}>
        <input 
          type="email" 
          placeholder="البريد الإلكتروني" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #333',
            backgroundColor: '#2a2a2a',
            color: 'white',
            boxSizing: 'border-box'
          }}
        />
        <input 
          type="password" 
          placeholder="كلمة المرور" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '6px',
            border: '1px solid #333',
            backgroundColor: '#2a2a2a',
            color: 'white',
            boxSizing: 'border-box'
          }}
        />

        {error && <p style={{ color: '#ff4d4d', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

        <button 
          type="submit" 
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#d4af37',
            color: 'black',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '15px'
          }}
        >
          {loading ? 'جاري المعالجة...' : (isRegistering ? 'إنشاء حساب' : 'دخول')}
        </button>
      </form>

      <div style={{ margin: '15px 0', color: '#666' }}>أو</div>

      <button 
        onClick={handleGoogleLogin}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: 'transparent',
          color: 'white',
          border: '1px solid #555',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
        الدخول بواسطة Google
      </button>
    </div>
  );
};

export default AuthModal;
