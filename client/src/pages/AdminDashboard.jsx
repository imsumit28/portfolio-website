import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api, { ASSET_BASE_URL } from '../utils/api';
import {
  FaTrash, FaEdit, FaPlus, FaCheck, FaEnvelope,
  FaSignOutAlt, FaFolderOpen, FaInbox, FaBell
} from 'react-icons/fa';

// Derive a friendly first name from the user record. Prefers an explicit
// `name`, otherwise falls back to the (cleaned, capitalized) email local part.
const displayNameFrom = (user) => {
  if (!user) return 'Admin';
  if (user.name && user.name.trim()) return user.name.trim().split(/\s+/)[0];
  const local = (user.email || '').split('@')[0].replace(/[^a-zA-Z]+/g, ' ').trim();
  if (!local) return 'Admin';
  const first = local.split(/\s+/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
};

const initialsFrom = (user) => {
  const source = (user?.name || user?.email || 'A').trim();
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  const letters = (parts[0]?.[0] || 'A') + (parts[1]?.[0] || '');
  return letters.toUpperCase();
};

const emptyForm = { title: '', description: '', technologies: '', liveLink: '', githubLink: '', order: 0 };

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  // Projects state
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  // Messages state
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchMessages();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get('/contact');
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  // Access control is enforced by the <RequireAdmin> route wrapper and by the
  // backend on every admin API call.

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    Object.keys(projectForm).forEach((key) => formData.append(key, projectForm[key]));
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/projects', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      closeModal();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies ? project.technologies.join(', ') : '',
      liveLink: project.liveLink || '',
      githubLink: project.githubLink || '',
      order: project.order || 0
    });
    setImageFile(null);
    setShowProjectModal(true);
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setProjectForm(emptyForm);
    setImageFile(null);
    setShowProjectModal(true);
  };

  const closeModal = () => {
    setShowProjectModal(false);
    setEditingProject(null);
    setProjectForm(emptyForm);
    setImageFile(null);
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;
  const name = displayNameFrom(user);

  return (
    <div className="admin-theme admin-shell">
      {/* Top bar */}
      <header className="admin-topbar">
        <div>
          <p className="admin-eyebrow">Control Panel</p>
          <h1 className="admin-greeting">
            Welcome back, <span className="admin-name">{name}</span>{' '}
            <span className="admin-wave" role="img" aria-label="waving hand">👋</span>
          </h1>
          <p className="admin-subtitle">Here's what's happening across your portfolio today.</p>
        </div>

        <div className="admin-user">
          <div className="admin-avatar" aria-hidden="true">{initialsFrom(user)}</div>
          <div className="admin-user-meta">
            <span className="admin-user-name">{name}</span>
            <span className="admin-user-email">{user?.email}</span>
          </div>
          <button type="button" className="admin-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon"><FaFolderOpen /></div>
          <div className="admin-stat-body">
            <span className="admin-stat-value">{projects.length}</span>
            <span className="admin-stat-label">Projects</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon"><FaInbox /></div>
          <div className="admin-stat-body">
            <span className="admin-stat-value">{messages.length}</span>
            <span className="admin-stat-label">Total Messages</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon"><FaBell /></div>
          <div className="admin-stat-body">
            <span className="admin-stat-value">{unreadCount}</span>
            <span className="admin-stat-label">Unread</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="admin-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'projects'}
          className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Manage Projects
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'messages'}
          className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
          {unreadCount > 0 && <span className="admin-tab-badge">{unreadCount}</span>}
        </button>
      </div>

      {/* Projects panel */}
      {activeTab === 'projects' && (
        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2 className="admin-panel-title">Projects Portfolio</h2>
            <button className="btn-global btn-global-primary btn-global-sm" onClick={openCreateModal}>
              <FaPlus /> Add New Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="admin-empty">
              <FaFolderOpen size={54} />
              <p>No projects yet. Add your first project to get started.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project._id}>
                      <td>
                        {project.image ? (
                          <img
                            src={`${ASSET_BASE_URL}${project.image}`}
                            alt={project.title}
                            className="admin-thumb"
                          />
                        ) : (
                          <div className="admin-thumb-empty">No Img</div>
                        )}
                      </td>
                      <td>
                        <div className="admin-cell-title">{project.title}</div>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="admin-tech-row">
                            {project.technologies.slice(0, 4).map((t, i) => (
                              <span className="admin-tech-chip" key={i}>{t}</span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td><span className="admin-order-badge">{project.order}</span></td>
                      <td>
                        <div className="admin-row-actions">
                          <button
                            className="admin-icon-btn"
                            aria-label={`Edit ${project.title}`}
                            onClick={() => openEditModal(project)}
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            className="admin-icon-btn danger"
                            aria-label={`Delete ${project.title}`}
                            onClick={() => deleteProject(project._id)}
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Messages panel */}
      {activeTab === 'messages' && (
        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2 className="admin-panel-title">Contact Messages</h2>
          </div>

          {messages.length === 0 ? (
            <div className="admin-empty">
              <FaEnvelope size={54} />
              <p>No messages received yet.</p>
            </div>
          ) : (
            <div className="admin-msg-grid">
              {messages.map((msg) => (
                <div className={`admin-msg-card ${msg.isRead ? '' : 'unread'}`} key={msg._id}>
                  <div className="admin-msg-head">
                    <div>
                      <h3 className="admin-msg-name">{msg.name}</h3>
                      <p className="admin-msg-email">{msg.email}</p>
                    </div>
                    {!msg.isRead && <span className="admin-msg-new">New</span>}
                  </div>
                  <p className="admin-msg-body">{msg.message}</p>
                  <div className="admin-msg-foot">
                    <span className="admin-msg-date">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                    {!msg.isRead && (
                      <button
                        className="btn-global btn-global-primary btn-global-sm"
                        onClick={() => markAsRead(msg._id)}
                      >
                        <FaCheck /> Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Project modal */}
      {showProjectModal && (
        <div className="admin-modal-overlay custom-scrollbar" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h3 className="admin-modal-title">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button type="button" className="admin-modal-close" aria-label="Close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="admin-modal-body">
              <form onSubmit={handleProjectSubmit}>
                <div className="admin-form-grid">
                  <div className="admin-field">
                    <label htmlFor="project-title" className="admin-label">Title *</label>
                    <input
                      id="project-title"
                      type="text"
                      className="admin-input"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="project-order" className="admin-label">Order</label>
                    <input
                      id="project-order"
                      type="number"
                      className="admin-input"
                      value={projectForm.order}
                      onChange={(e) => setProjectForm((p) => ({ ...p, order: e.target.value }))}
                    />
                  </div>

                  <div className="admin-field col-span-2">
                    <label htmlFor="project-description" className="admin-label">Description *</label>
                    <textarea
                      id="project-description"
                      className="admin-input"
                      rows="3"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="admin-field col-span-2">
                    <label htmlFor="project-tech" className="admin-label">Technologies</label>
                    <input
                      id="project-tech"
                      type="text"
                      className="admin-input"
                      placeholder="React, Node.js, MongoDB"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm((p) => ({ ...p, technologies: e.target.value }))}
                    />
                  </div>

                  <div className="admin-field">
                    <label htmlFor="project-live-link" className="admin-label">Live Link</label>
                    <input
                      id="project-live-link"
                      type="url"
                      className="admin-input"
                      placeholder="https://"
                      value={projectForm.liveLink}
                      onChange={(e) => setProjectForm((p) => ({ ...p, liveLink: e.target.value }))}
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="project-github-url" className="admin-label">GitHub URL</label>
                    <input
                      id="project-github-url"
                      type="url"
                      className="admin-input"
                      placeholder="https://"
                      value={projectForm.githubLink}
                      onChange={(e) => setProjectForm((p) => ({ ...p, githubLink: e.target.value }))}
                    />
                  </div>

                  <div className="admin-field col-span-2">
                    <label htmlFor="project-image" className="admin-label">Project Image</label>
                    <input
                      id="project-image"
                      type="file"
                      className="admin-input"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    {editingProject && editingProject.image && (
                      <span className="admin-input-hint">Current: {editingProject.image}</span>
                    )}
                  </div>
                </div>

                <div className="admin-modal-foot">
                  <button type="button" className="admin-btn-ghost" onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-global btn-global-primary btn-global-sm"
                    disabled={saving}
                  >
                    {saving ? 'Saving…' : editingProject ? 'Update Project' : 'Save Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
