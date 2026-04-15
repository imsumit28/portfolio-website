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
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
        <h2 className="fw-bold mb-0">Admin Dashboard</h2>
        <span className="badge bg-primary fs-6 py-2 px-3 rounded-pill text-white fw-normal">
          Welcome, Admin
        </span>
      </div>

      <ul className="nav nav-pills mb-4 gap-2">
        <li className="nav-item">
          <button 
            className={`nav-link rounded-pill px-4 ${activeTab === 'projects' ? 'active' : 'bg-white text-dark shadow-sm border'}`}
            onClick={() => setActiveTab('projects')}
          >
            Manage Projects
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link rounded-pill px-4 ${activeTab === 'messages' ? 'active' : 'bg-white text-dark shadow-sm border'}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages {messages.filter(m => !m.isRead).length > 0 && 
              <span className="badge bg-danger ms-2 rounded-pill">{messages.filter(m => !m.isRead).length}</span>
            }
          </button>
        </li>
      </ul>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="card border-0 shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Projects Portfolio</h4>
            <button 
              className="btn-global btn-global-primary btn-global-sm d-flex align-items-center"
              onClick={() => { resetProjectForm(); setShowProjectModal(true); }}
            >
              <FaPlus className="me-2" /> Add Project
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-4 text-muted">No projects found. Add your first project!</td></tr>
                ) : (
                  projects.map(project => (
                    <tr key={project._id}>
                      <td>
                        {project.image ? (
                          <img src={`http://localhost:5000${project.image}`} alt={project.title} className="rounded" style={{width: '60px', height: '40px', objectFit: 'cover'}} />
                        ) : (
                          <div className="bg-light rounded d-flex align-items-center justify-content-center text-muted" style={{width: '60px', height: '40px', fontSize: '12px'}}>No Img</div>
                        )}
                      </td>
                      <td className="fw-medium">{project.title}</td>
                      <td>{project.order}</td>
                      <td>
                        <button className="btn-global btn-global-secondary btn-global-sm me-2" onClick={() => openEditModal(project)}>
                          <FaEdit />
                        </button>
                        <button className="btn-global btn-global-sm me-2" style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.35)',color:'#f87171'}} onClick={() => deleteProject(project._id)}>
                          <FaTrash />
                        </button>
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
        <div className="card border-0 shadow-sm p-4">
          <h4 className="fw-bold mb-4">Contact Messages</h4>
          
          <div className="row g-4">
            {messages.length === 0 ? (
              <div className="col-12 py-5 text-center text-muted">
                <FaEnvelope size={40} className="mb-3 text-light" />
                <p>No messages received yet.</p>
              </div>
            ) : (
              messages.map(msg => (
                <div className="col-md-6" key={msg._id}>
                  <div className={`card h-100 ${msg.isRead ? 'border-light bg-light' : 'border-primary shadow-sm'}`}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-2">
                        <h5 className="card-title fw-bold mb-0">{msg.name}</h5>
                        {!msg.isRead && <span className="badge bg-primary rounded-pill">New</span>}
                      </div>
                      <h6 className="card-subtitle mb-3 text-muted">{msg.email}</h6>
                      <p className="card-text text-dark">{msg.message}</p>
                      
                      <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                        <small className="text-muted">{new Date(msg.createdAt).toLocaleDateString()}</small>
                        {!msg.isRead && (
                          <button className="btn-global btn-global-primary btn-global-sm d-flex align-items-center" onClick={() => markAsRead(msg._id)}>
                            <FaCheck className="me-1" /> Mark Read
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
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-light border-0">
                <h5 className="modal-title fw-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowProjectModal(false); resetProjectForm(); }}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleProjectSubmit}>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-medium">Title *</label>
                      <input type="text" className="form-control bg-light" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-medium">Display Order</label>
                      <input type="number" className="form-control bg-light" value={projectForm.order} onChange={(e) => setProjectForm({...projectForm, order: e.target.value})} />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-medium">Description *</label>
                      <textarea className="form-control bg-light" rows="4" value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} required></textarea>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-medium">Technologies (comma separated)</label>
                      <input type="text" className="form-control bg-light" placeholder="React, Node.js, MongoDB" value={projectForm.technologies} onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})} />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Live Link URL</label>
                      <input type="url" className="form-control bg-light" placeholder="https://" value={projectForm.liveLink} onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">GitHub Repository URL</label>
                      <input type="url" className="form-control bg-light" placeholder="https://" value={projectForm.githubLink} onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})} />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-medium">Project Image</label>
                      <input type="file" className="form-control bg-light" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                      {editingProject && editingProject.image && <small className="text-muted d-block mt-2">Current image: {editingProject.image}</small>}
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end mt-4 pt-3 border-top gap-2">
                    <button type="button" className="btn-global btn-global-secondary btn-global-sm" onClick={() => { setShowProjectModal(false); resetProjectForm(); }}>Cancel</button>
                    <button type="submit" className="btn-global btn-global-primary btn-global-sm px-4">{editingProject ? 'Update Project' : 'Save Project'}</button>
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
