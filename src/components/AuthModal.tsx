import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User
} from 'firebase/auth';

// إعدادات مشروعك التي زودتني بها
const firebaseConfig = {
  "projectId": "pubgco",
  "appId": "1:819347633108:web:2a971b3eb6a15da8999c41",
  "apiKey": "AIzaSyCRhYQ6ScNMO9GixZwW_Z5p_JtsK6CNxQw",
  "authDomain": "pubgco.firebaseapp.com",
  "storageBucket": "pubgco.firebasestorage.app",
  "messagingSenderId": "819347633108"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // مراقبة حالة المستخدم
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('تم إنشاء الحساب بنجاح!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      let message = 'حدث خطأ: تأكد من صحة البيانات وتفعيل الخيار في Firebase';
      if (err.code === 'auth/user-not-found') message = 'المستخدم غير موجود';
      if (err.code === 'auth/wrong-password') message = 'كلمة المرور خاطئة';
      if (err.code === 'auth/email-already-in-use') message = 'البريد مستخدم بالفعل';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError('فشل الدخول بواسطة Google');
    }
  };

  if (currentUser) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
        <p>مرحباً بك: {currentUser.email}</p>
        <button onClick={() => auth.signOut()} style={{ color: '#d4af37', background: 'none', border: '1px solid #d4af37', padding: '5px 10px', cursor: 'pointer' }}>تسجيل خروج</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '30px', borderRadius: '15px', maxWidth: '350px', margin: '20px auto', border: '1px solid #333' }}>
      <h3 style={{ textAlign: 'center', color: '#d4af37' }}>{isRegistering ? 'إنشاء حساب' : 'تسجيل دخول'}</h3>
      
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" placeholder="البريد الإلكتروني" required value={email} onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: '12px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: 'white' }} />
        
        <input type="password" placeholder="كلمة المرور" required value={password} onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: '12px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: 'white' }} />
        
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        
        <button type="submit" disabled={loading} style={{ padding: '12px', backgroundColor: '#d4af37', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? 'جاري المعالجة...' : (isRegistering ? 'إنشاء حساب' : 'دخول')}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '10px', cursor: 'pointer', color: '#aaa' }} onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'لديك حساب بالفعل؟ سجل دخول' : 'ليس لديك حساب؟ أنشئ حساباً'}
      </p>

      <div style={{ textAlign: 'center', margin: '15px 0', borderTop: '1px solid #333', paddingTop: '15px' }}>
        <button onClick={handleGoogle} style={{ width: '100%', padding: '10px', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="16" alt="" />
          الدخول بواسطة Google
        </button>
      </div>
    </div>
   );
};

export default AuthComponent;
