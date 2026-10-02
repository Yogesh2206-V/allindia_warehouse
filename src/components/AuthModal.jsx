import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Building2, 
  CheckCircle2, 
  LogIn, 
  UserPlus, 
  KeyRound, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { warehouseApi } from '../services/api';

export default function AuthModal({ isOpen, onClose, initialTab = 'login', onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [otpSent, setOtpSent] = useState(false);
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Alert/Message State
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginIdentifier) {
      setErrorMessage('Please enter your mobile number or email.');
      return;
    }

    if (loginMethod === 'otp' && !otpSent) {
      setOtpSent(true);
      setSuccessMessage('OTP sent to ' + loginIdentifier);
      return;
    }

    try {
      setSubmitting(true);
      const res = await warehouseApi.login(loginIdentifier);
      const userData = res.user || {
        name: loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'Member User',
        email: loginIdentifier.includes('@') ? loginIdentifier : 'user@domain.com',
        phone: loginIdentifier.includes('@') ? '+91 98840 12341' : loginIdentifier,
        company: 'Logistics Partner',
        avatarInitial: loginIdentifier.charAt(0).toUpperCase()
      };
      userData.avatarInitial = userData.name ? userData.name.charAt(0).toUpperCase() : 'U';

      localStorage.setItem('aiw_auth_user', JSON.stringify(userData));

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      if (onAuthSuccess) {
        onAuthSuccess(userData);
      }

      setSuccessMessage('Login successful! Welcome back.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName || !regEmail || !regPhone) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await warehouseApi.register({
        name: regName,
        email: regEmail,
        phone: regPhone,
        company: regCompany
      });

      const userData = res.user || {
        name: regName,
        email: regEmail,
        phone: regPhone,
        company: regCompany || 'Enterprise Client',
        avatarInitial: regName.charAt(0).toUpperCase()
      };
      userData.avatarInitial = userData.name ? userData.name.charAt(0).toUpperCase() : 'U';

      localStorage.setItem('aiw_auth_user', JSON.stringify(userData));

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (onAuthSuccess) {
        onAuthSuccess(userData);
      }

      setSuccessMessage('Account registered successfully! Welcome.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleAuth = () => {
    const googleUser = {
      name: 'Anand Kumar',
      email: 'anand.kumar@company.com',
      phone: '+91 98840 12341',
      company: 'Supply Chain Enterprises',
      avatarInitial: 'A'
    };
    localStorage.setItem('aiw_auth_user', JSON.stringify(googleUser));

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSuccessMessage('Signed in with Google.');
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(googleUser);
      onClose();
    }, 700);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setResetSent(true);
    setSuccessMessage('Password reset link sent.');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content auth-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Tabs */}
        <div className="auth-header-strip">
          <div className="auth-tabs">
            <button 
              type="button"
              className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => { setActiveTab('login'); setErrorMessage(''); setSuccessMessage(''); }}
            >
              <LogIn size={15} /> Sign In
            </button>
            <button 
              type="button"
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => { setActiveTab('register'); setErrorMessage(''); setSuccessMessage(''); }}
            >
              <UserPlus size={15} /> Sign Up
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="auth-modal-body">
          {errorMessage && (
            <div className="auth-alert error">
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="auth-alert success">
              <CheckCircle2 size={16} className="text-teal" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <h3 className="auth-title">Sign In</h3>

              {/* Login Method Toggle */}
              <div className="login-method-pills">
                <button 
                  type="button"
                  className={`method-pill ${loginMethod === 'password' ? 'active' : ''}`}
                  onClick={() => { setLoginMethod('password'); setOtpSent(false); }}
                >
                  Password
                </button>
                <button 
                  type="button"
                  className={`method-pill ${loginMethod === 'otp' ? 'active' : ''}`}
                  onClick={() => setLoginMethod('otp')}
                >
                  Instant OTP
                </button>
              </div>

              {/* Identifier */}
              <div className="auth-field">
                <label>Email or Mobile Number</label>
                <div className="auth-input-wrap">
                  <User size={15} className="auth-icon" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter email or mobile number"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Password or OTP */}
              {loginMethod === 'password' ? (
                <div className="auth-field">
                  <div className="label-with-link">
                    <label>Password</label>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('forgot')}
                      className="forgot-link"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="auth-input-wrap">
                    <Lock size={15} className="auth-icon" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required 
                      placeholder="Enter password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="auth-input"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="pwd-toggle-btn"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ) : (
                otpSent && (
                  <div className="auth-field">
                    <label>6-Digit OTP</label>
                    <div className="auth-input-wrap">
                      <KeyRound size={15} className="auth-icon" />
                      <input 
                        type="text" 
                        required 
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        value={loginOtp}
                        onChange={(e) => setLoginOtp(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>
                )
              )}

              {/* Remember Me */}
              <div className="auth-row-remember">
                <label className="auth-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  <span>Remember me</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button type="submit" className="btn btn-red btn-block btn-lg auth-submit-btn">
                <span>{loginMethod === 'otp' && !otpSent ? 'Send OTP' : 'Sign In'}</span>
              </button>

              {/* Social Login */}
              <div className="auth-divider">
                <span>OR</span>
              </div>

              <button 
                type="button" 
                onClick={handleGoogleAuth} 
                className="btn btn-outline btn-block google-btn"
              >
                <svg className="google-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="auth-footer-text">
                Don't have an account?{' '}
                <button type="button" onClick={() => setActiveTab('register')} className="switch-auth-btn">
                  Sign Up
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <h3 className="auth-title">Create Account</h3>

              <div className="form-row-2">
                <div className="auth-field">
                  <label>Full Name</label>
                  <div className="auth-input-wrap">
                    <User size={15} className="auth-icon" />
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>
                <div className="auth-field">
                  <label>Phone Number</label>
                  <div className="auth-input-wrap">
                    <Phone size={15} className="auth-icon" />
                    <input 
                      type="tel" 
                      required 
                      placeholder="Enter mobile number"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row-2">
                <div className="auth-field">
                  <label>Company Name</label>
                  <div className="auth-input-wrap">
                    <Building2 size={15} className="auth-icon" />
                    <input 
                      type="text" 
                      placeholder="Enter company name"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>
                <div className="auth-field">
                  <label>Email Address</label>
                  <div className="auth-input-wrap">
                    <Mail size={15} className="auth-icon" />
                    <input 
                      type="email" 
                      placeholder="Enter email address"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>
              </div>

              <div className="auth-field">
                <label>Password</label>
                <div className="auth-input-wrap">
                  <Lock size={15} className="auth-icon" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    placeholder="Enter password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="auth-input"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="pwd-toggle-btn"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="auth-row-remember">
                <label className="auth-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms} 
                    onChange={(e) => setAgreeTerms(e.target.checked)} 
                  />
                  <span>I agree to the Terms & Privacy Policy</span>
                </label>
              </div>

              <button type="submit" className="btn btn-red btn-block btn-lg auth-submit-btn">
                <span>Create Account</span>
              </button>

              <div className="auth-footer-text">
                Already have an account?{' '}
                <button type="button" onClick={() => setActiveTab('login')} className="switch-auth-btn">
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {activeTab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="auth-form">
              <h3 className="auth-title">Reset Password</h3>

              {resetSent ? (
                <div className="reset-sent-box">
                  <CheckCircle2 size={32} className="text-teal" />
                  <h4>Reset Link Sent</h4>
                  <p>Check your email for reset instructions.</p>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('login')}
                    className="btn btn-outline btn-sm"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <>
                  <div className="auth-field">
                    <label>Email Address</label>
                    <div className="auth-input-wrap">
                      <Mail size={15} className="auth-icon" />
                      <input 
                        type="email" 
                        required 
                        placeholder="Enter email address"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-red btn-block btn-lg auth-submit-btn">
                    Send Reset Link
                  </button>

                  <div className="auth-footer-text">
                    <button type="button" onClick={() => setActiveTab('login')} className="switch-auth-btn">
                      Back to Sign In
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>

      <style>{`
        .auth-modal-box {
          max-width: 460px;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .auth-header-strip {
          background: #f9fafb;
          border-bottom: 1px solid var(--border-color);
          padding: 6px 14px 0;
        }

        .auth-tabs {
          display: flex;
          gap: 6px;
        }

        .auth-tab-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          border-bottom: 3px solid transparent;
          transition: var(--transition);
        }

        .auth-tab-btn.active {
          color: var(--brand-red);
          border-bottom-color: var(--brand-red);
          background: #ffffff;
          border-radius: var(--radius-xs) var(--radius-xs) 0 0;
        }

        .auth-modal-body {
          padding: 22px 24px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .auth-title {
          font-size: 1.2rem;
          color: var(--text-heading);
          margin-bottom: 2px;
          font-weight: 700;
        }

        .login-method-pills {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          background: #f3f4f6;
          padding: 3px;
          border-radius: var(--radius-xs);
        }

        .method-pill {
          padding: 5px 8px;
          font-size: 0.775rem;
          font-weight: 600;
          color: var(--text-sub);
          border-radius: var(--radius-xs);
        }

        .method-pill.active {
          background: #ffffff;
          color: #003666;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .auth-field label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-heading);
        }

        .label-with-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .forgot-link {
          font-size: 0.75rem;
          color: var(--brand-red);
          font-weight: 600;
        }

        .auth-input-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xs);
          padding: 8px 10px;
          transition: var(--transition);
        }

        .auth-input-wrap:focus-within {
          border-color: #003666;
          background: #ffffff;
          box-shadow: 0 0 0 2px rgba(0, 54, 102, 0.1);
        }

        .auth-icon {
          color: #9ca3af;
          flex-shrink: 0;
        }

        .auth-input {
          width: 100%;
          border: none;
          background: transparent;
          font-size: 0.85rem;
          color: var(--text-main);
          outline: none;
        }

        .pwd-toggle-btn {
          color: #9ca3af;
          padding: 2px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        @media (max-width: 480px) {
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }

        .auth-row-remember {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.775rem;
          color: var(--text-sub);
        }

        .auth-checkbox-label {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .auth-checkbox-label input {
          accent-color: var(--brand-red);
        }

        .auth-submit-btn {
          margin-top: 2px;
          height: 42px;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 2px 0;
        }

        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--border-color);
        }

        .auth-divider span {
          padding: 0 8px;
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-light);
        }

        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.825rem;
          height: 40px;
        }

        .google-icon {
          flex-shrink: 0;
        }

        .auth-footer-text {
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .switch-auth-btn {
          color: var(--brand-red);
          font-weight: 700;
          text-decoration: underline;
        }

        .auth-alert {
          padding: 8px 12px;
          border-radius: var(--radius-xs);
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .auth-alert.error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
        }

        .auth-alert.success {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
        }

        .reset-sent-box {
          text-align: center;
          padding: 20px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .reset-sent-box h4 {
          color: var(--text-heading);
          margin: 0;
        }

        .reset-sent-box p {
          color: var(--text-sub);
          font-size: 0.825rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
