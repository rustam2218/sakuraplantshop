import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  if (loading) {
    return <div className="profile-loading">Загрузка...</div>;
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-empty">
          <h2>Вход необходим</h2>
          <p>Пожалуйста, войдите в систему, чтобы увидеть ваш профиль.</p>
          <a href="/" className="back-link">← Вернуться на главную</a>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h1>👤 Мой профиль</h1>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" />
            ) : (
              <div className="avatar-placeholder">👤</div>
            )}
          </div>

          <div className="profile-info">
            <div className="info-row">
              <label>Имя:</label>
              <span>{user.displayName || "Не указано"}</span>
            </div>

            <div className="info-row">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>

            <div className="info-row">
              <label>Статус:</label>
              <span className="status-verified">✓ Подтверждено</span>
            </div>

            <div className="info-row">
              <label>Присоединился:</label>
              <span>{new Date(user.metadata.creationTime).toLocaleDateString("ru-RU")}</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleLogout} className="logout-button">
            Выйти из аккаунта
          </button>
        </div>

        <div className="profile-footer">
          <p>Это ваш профиль в магазине SAKURA KHUJAND</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
