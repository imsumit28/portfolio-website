import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { FaTrash, FaEdit, FaPlus, FaCheck, FaEnvelope } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('projects');
  
  // Projects State
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', technologies: '', liveLink: '', githubLink: '', order: 0
  });
  const [imageFile, setImageFile] = useState(null);

  // Messages State
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

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Project Handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(projectForm).forEach(key => {
      formData.append(key, projectForm[key]);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }

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
      setShowProjectModal(false);
      setEditingProject(null);
      resetProjectForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
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
    setShowProjectModal(true);
  };

  const resetProjectForm = () => {
    setProjectForm({ title: '', description: '', technologies: '', liveLink: '', githubLink: '', order: 0 });
    setImageFile(null);
    setEditingProject(null);
  };

  // Message Handlers
  const markAsRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5 admin-theme" style={{ minHeight: '100vh', color: 'var(--text-main)' }}>
      {/* Header section */}
      <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary border-opacity-10 pb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ letterSpacing: '-0.5px', fontFamily: 'var(--font-display)' }}>Admin Dashboard</h2>
          <p className="small mb-0" style={{ color: 'rgba(148,163,184,0.9)' }}>Manage your portfolio content and messages</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-20 fs-6 py-2 px-4 rounded-pill fw-normal">
            <span className="d-inline-block me-2" style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent)' }}></span>
            Welcome, Admin
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-pills mb-5 gap-3 p-1 rounded-4" style={{ background: 'rgba(255,255,255,0.03)', width: 'fit-content' }}>
        <li className="nav-item">
          <button 
            className={`nav-link rounded-4 px-4 py-2 fw-semibold transition-all border-0`}
            style={activeTab === 'projects' ? { background: 'var(--accent)', color: '#000' } : { color: 'rgba(226,232,240,0.85)' }}
            onClick={() => setActiveTab('projects')}
          >
            Manage Projects
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link rounded-4 px-4 py-2 fw-semibold transition-all border-0`}
            style={activeTab === 'messages' ? { background: 'var(--accent)', color: '#000' } : { color: 'rgba(226,232,240,0.85)' }}
            onClick={() => setActiveTab('messages')}
          >
            Messages {messages.filter(m => !m.isRead).length > 0 && 
              <span className="badge bg-danger ms-2 rounded-pill" style={{ fontSize: '10px' }}>{messages.filter(m => !m.isRead).length}</span>
            }
          </button>
        </li>
      </ul>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="card border-0 p-4" style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0" style={{ fontFamily: 'var(--font-display)' }}>Projects Portfolio</h4>
            <button 
              className="btn-global btn-global-primary btn-global-sm d-flex align-items-center px-4"
              onClick={() => { resetProjectForm(); setShowProjectModal(true); }}
            >
              <FaPlus className="me-2" /> Add New Project
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle admin-table" style={{ color: 'var(--text-main)' }}>
              <thead style={{ borderBottom: '2px solid rgba(255,255,255,0.05)' }}>
                <tr>
                  <th className="py-3 small uppercase tracking-wider" style={{ color: 'rgba(148,163,184,0.95)' }}>Image</th>
                  <th className="py-3 small uppercase tracking-wider" style={{ color: 'rgba(148,163,184,0.95)' }}>Title</th>
                  <th className="py-3 small uppercase tracking-wider" style={{ color: 'rgba(148,163,184,0.95)' }}>Order</th>
                  <th className="py-3 small uppercase tracking-wider" style={{ color: 'rgba(148,163,184,0.95)' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                {projects.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-5" style={{ color: 'rgba(148,163,184,0.95)' }}>No projects found. Add your first project!</td></tr>
                ) : (
                  projects.map(project => (
                    <tr key={project._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td className="py-3">
                        {project.image ? (
                          <img src={`http://localhost:5000${project.image}`} alt={project.title} className="rounded-3" style={{width: '60px', height: '40px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)'}} />
                        ) : (
                          <div className="rounded-3 d-flex align-items-center justify-content-center" style={{width: '60px', height: '40px', background: 'rgba(255,255,255,0.05)', color: 'rgba(148,163,184,0.95)', fontSize: '10px'}}>No Img</div>
                        )}
                      </td>
                      <td className="fw-medium py-3">{project.title}</td>
                      <td className="py-3"><span className="badge bg-secondary bg-opacity-10 px-3 py-2 rounded-pill fw-normal" style={{ color: 'rgba(148,163,184,0.95)' }}>{project.order}</span></td>
                      <td className="py-3">
                        <div className="d-flex gap-2">
                          <button className="btn p-2 rounded-3 text-white border-0 transition-all" style={{ background: 'rgba(255,255,255,0.05)' }} onClick={() => openEditModal(project)}>
                            <FaEdit size={14} />
                          </button>
                          <button className="btn p-2 rounded-3 border-0 transition-all" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }} onClick={() => deleteProject(project._id)}>
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="card border-0 p-4" style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h4 className="fw-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Contact Messages</h4>
          
          <div className="row g-4">
            {messages.length === 0 ? (
              <div className="col-12 py-5 text-center text-muted opacity-50">
                <FaEnvelope size={60} className="mb-4 d-block mx-auto" />
                <p className="fs-5">No messages received yet.</p>
              </div>
            ) : (
              messages.map(msg => (
                <div className="col-md-6" key={msg._id}>
                  <div 
                    className="card h-100 transition-all" 
                    style={{
                      background: msg.isRead ? 'rgba(255,255,255,0.03)' : 'rgba(16,185,129,0.05)',
                      border: msg.isRead ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(16,185,129,0.3)',
                      opacity: msg.isRead ? 0.7 : 1,
                      borderRadius: '16px'
                    }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h5 className="fw-bold mb-1" style={{ color: msg.isRead ? 'var(--text-muted)' : 'var(--text-main)' }}>
                            {msg.name}
                          </h5>
                          <h6 className="small mb-3" style={{ color: 'var(--accent)', opacity: 0.95 }}>{msg.email}</h6>
                        </div>
                        {!msg.isRead && (
                          <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 rounded-pill px-3">
                            New
                          </span>
                        )}
                      </div>
                      
                      <p className="mb-4" style={{ color: msg.isRead ? 'rgba(255,255,255,0.5)' : 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {msg.message}
                      </p>
                      
                      <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-10">
                        <small style={{ color: 'rgba(148,163,184,0.9)' }}>{new Date(msg.createdAt).toLocaleDateString()}</small>
                        {!msg.isRead && (
                          <button 
                            className="btn-global btn-global-primary btn-global-sm d-flex align-items-center" 
                            onClick={() => markAsRead(msg._id)}
                          >
                            <FaCheck className="me-2" /> Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="modal d-block custom-scrollbar" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflowY: 'auto', padding: '20px 0' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', maxWidth: '600px', margin: 'auto' }}>
              <div className="modal-header border-bottom border-secondary border-opacity-10 p-3 px-4">
                <h5 className="modal-title fw-bold text-white mb-0" style={{ fontSize: '1.1rem' }}>
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  style={{ fontSize: '0.8rem' }}
                  onClick={() => { setShowProjectModal(false); resetProjectForm(); }}
                ></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleProjectSubmit}>
                  <div className="row g-2">
                    <div className="col-md-9">
                      <label className="form-label fw-medium small uppercase tracking-wider mb-1" style={{ color: 'rgba(148,163,184,0.95)' }}>Title *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', padding: '10px', fontSize: '0.9rem' }}
                        value={projectForm.title} 
                        onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-medium small uppercase tracking-wider mb-1" style={{ color: 'rgba(148,163,184,0.95)' }}>Order</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', padding: '10px', fontSize: '0.9rem' }}
                        value={projectForm.order} 
                        onChange={(e) => setProjectForm({...projectForm, order: e.target.value})} 
                      />
                    </div>
                    
                    <div className="col-12 mt-3">
                      <label className="form-label fw-medium small uppercase tracking-wider mb-1" style={{ color: 'rgba(148,163,184,0.95)' }}>Description *</label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', padding: '10px', fontSize: '0.9rem' }}
                        value={projectForm.description} 
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} 
                        required
                      ></textarea>
                    </div>
                    
                    <div className="col-12 mt-3">
                      <label className="form-label fw-medium small uppercase tracking-wider mb-1" style={{ color: 'rgba(148,163,184,0.95)' }}>Technologies</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', padding: '10px', fontSize: '0.9rem' }}
                        placeholder="React, Node.js, MongoDB" 
                        value={projectForm.technologies} 
                        onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})} 
                      />
                    </div>
                    
                    <div className="col-md-6 mt-3">
                      <label className="form-label fw-medium small uppercase tracking-wider mb-1" style={{ color: 'rgba(148,163,184,0.95)' }}>Live Link</label>
                      <input 
                        type="url" 
                        className="form-control" 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', padding: '10px', fontSize: '0.9rem' }}
                        placeholder="https://" 
                        value={projectForm.liveLink} 
                        onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})} 
                      />
                    </div>
                    <div className="col-md-6 mt-3">
                      <label className="form-label fw-medium small uppercase tracking-wider mb-1" style={{ color: 'rgba(148,163,184,0.95)' }}>GitHub URL</label>
                      <input 
                        type="url" 
                        className="form-control" 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', padding: '10px', fontSize: '0.9rem' }}
                        placeholder="https://" 
                        value={projectForm.githubLink} 
                        onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})} 
                      />
                    </div>
                    
                    <div className="col-12 mt-3">
                      <label className="form-label fw-medium small uppercase tracking-wider mb-1" style={{ color: 'rgba(148,163,184,0.95)' }}>Project Image</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', padding: '8px', fontSize: '0.85rem' }}
                        accept="image/*" 
                        onChange={(e) => setImageFile(e.target.files[0])} 
                      />
                      {editingProject && editingProject.image && <small className="d-block mt-1" style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.85)' }}>Current: {editingProject.image}</small>}
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end mt-4 pt-3 border-top border-secondary border-opacity-10 gap-2">
                    <button 
                      type="button" 
                      className="btn px-4 text-white border-0" 
                      style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', fontSize: '0.9rem' }}
                      onClick={() => { setShowProjectModal(false); resetProjectForm(); }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-global btn-global-primary btn-global-sm px-4"
                      style={{ borderRadius: '10px', fontSize: '0.9rem' }}
                    >
                      {editingProject ? 'Update Project' : 'Save Project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
