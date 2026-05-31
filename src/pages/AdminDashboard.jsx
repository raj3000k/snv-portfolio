import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/admin.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getDeviconUrl = (skillName) => {
  const name = skillName.toLowerCase().trim();
  
  // Custom mappings for popular tech stacks
  const customMap = {
    'c++': 'cplusplus/cplusplus-original',
    'cpp': 'cplusplus/cplusplus-original',
    'c': 'c/c-original',
    'js': 'javascript/javascript-original',
    'javascript': 'javascript/javascript-original',
    'ts': 'typescript/typescript-original',
    'typescript': 'typescript/typescript-original',
    'react': 'react/react-original',
    'reactjs': 'react/react-original',
    'node': 'nodejs/nodejs-original',
    'nodejs': 'nodejs/nodejs-original',
    'express': 'express/express-original',
    'expressjs': 'express/express-original',
    'mongodb': 'mongodb/mongodb-original',
    'mongo': 'mongodb/mongodb-original',
    'html': 'html5/html5-original',
    'html5': 'html5/html5-original',
    'css': 'css3/css3-original',
    'css3': 'css3/css3-original',
    'python': 'python/python-original',
    'django': 'django/django-plain',
    'git': 'git/git-original',
    'github': 'github/github-original',
    'flutter': 'flutter/flutter-original',
    'dart': 'dart/dart-original',
    'mysql': 'mysql/mysql-original',
    'postgres': 'postgresql/postgresql-original',
    'postgresql': 'postgresql/postgresql-original',
    'sql': 'mysql/mysql-original',
    'tailwind': 'tailwindcss/tailwindcss-plain',
    'tailwindcss': 'tailwindcss/tailwindcss-plain',
    'firebase': 'firebase/firebase-plain',
    'docker': 'docker/docker-original',
    'aws': 'amazonwebservices/amazonwebservices-original-wordmark',
    'java': 'java/java-original',
    'golang': 'go/go-original',
    'go': 'go/go-original'
  };

  if (customMap[name]) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${customMap[name]}.svg`;
  }
  
  // Fallback pattern
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
};

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  // Portfolio Data
  const [portfolioData, setPortfolioData] = useState({
    profile: {
      name: '',
      title: '',
      bio: '',
      email: '',
      github: '',
      linkedin: '',
      twitter: '',
      availability: true,
      skills: []
    },
    experiences: [],
    educations: [],
    projects: [],
    achievements: []
  });

  // Edit / Add Form States
  const [editingItem, setEditingItem] = useState(null); // { type: 'experience'|'education'|'project'|'achievement', item: Object }
  const [isAdding, setIsAdding] = useState(null); // 'experience'|'education'|'project'|'achievement'
  
  // Custom Form Fields for Create/Edit
  const [expForm, setExpForm] = useState({ title: '', company: '', duration: '', location: '', description: '', logoUrl: '', orderIndex: 0 });
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', duration: '', location: '', orderIndex: 0 });
  const [projForm, setProjForm] = useState({ title: '', subtitle: '', techStack: '', description: '', imageUrl: '', githubUrl: '', liveUrl: '', orderIndex: 0 });
  const [achForm, setAchForm] = useState({ title: '', description: '', date: '', imageUrl: '', orderIndex: 0 });
  
  // Skill Adding State
  const [newSkill, setNewSkill] = useState({ name: '', logoUrl: '' });

  const navigate = useNavigate();

  // Load css body class
  useEffect(() => {
    document.body.classList.add('admin-body');
    return () => {
      document.body.classList.remove('admin-body');
    };
  }, []);

  // Verify Token
  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (authToken) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setIsAuthenticated(true);
        fetchPortfolioData();
      } else {
        handleLogout();
      }
    } catch (err) {
      handleLogout();
    }
  };

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/portfolio`);
      if (res.ok) {
        const data = await res.json();
        setPortfolioData(data);
      }
    } catch (err) {
      toast.error('Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        toast.success('Logged in successfully!');
      } else {
        toast.error(data.message || 'Invalid Credentials');
      }
    } catch (err) {
      toast.error('Authentication request failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setIsAuthenticated(false);
  };

  // Upload handler
  const handleFileUpload = async (file, fieldToUpdate, type = 'profile') => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_BASE}/api/admin/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('File uploaded successfully!');
        if (type === 'profile') {
          setPortfolioData({
            ...portfolioData,
            profile: {
              ...portfolioData.profile,
              [fieldToUpdate]: data.url
            }
          });
        } else if (type === 'experience') {
          setExpForm({ ...expForm, [fieldToUpdate]: data.url });
        } else if (type === 'project') {
          setProjForm({ ...projForm, [fieldToUpdate]: data.url });
        } else if (type === 'achievement') {
          setAchForm({ ...achForm, [fieldToUpdate]: data.url });
        } else if (type === 'newSkill') {
          setNewSkill({ ...newSkill, logoUrl: data.url });
        }
      } else {
        toast.error(data.message || 'Upload failed');
      }
    } catch (err) {
      toast.error('File upload failed');
    }
  };

  // Profile Save
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/admin/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(portfolioData.profile)
      });
      if (res.ok) {
        toast.success('Profile updated successfully!');
        fetchPortfolioData();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Update failed');
      }
    } catch (err) {
      toast.error('Profile save request failed');
    }
  };

  // Skill Handlers
  const handleAddSkill = () => {
    if (!newSkill.name) {
      return toast.warning('Please enter a skill name');
    }
    const logoUrl = getDeviconUrl(newSkill.name);
    const updatedSkills = [...portfolioData.profile.skills, { name: newSkill.name.trim(), logoUrl }];
    setPortfolioData({
      ...portfolioData,
      profile: {
        ...portfolioData.profile,
        skills: updatedSkills
      }
    });
    setNewSkill({ name: '', logoUrl: '' });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...portfolioData.profile.skills];
    updatedSkills.splice(index, 1);
    setPortfolioData({
      ...portfolioData,
      profile: {
        ...portfolioData.profile,
        skills: updatedSkills
      }
    });
  };

  // CRUD Save Handlers
  const handleCrudSave = async (type, id = null) => {
    let url = `${API_BASE}/api/admin/${type}s`;
    let method = 'POST';
    let body = {};

    if (id) {
      url += `/${id}`;
      method = 'PUT';
    }

    if (type === 'experience') body = expForm;
    if (type === 'education') body = eduForm;
    if (type === 'project') {
      body = {
        ...projForm,
        techStack: typeof projForm.techStack === 'string' 
          ? projForm.techStack.split(',').map(s => s.trim()).filter(Boolean) 
          : projForm.techStack
      };
    }
    if (type === 'achievement') body = achForm;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully!`);
        setIsAdding(null);
        setEditingItem(null);
        fetchPortfolioData();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Save failed');
      }
    } catch (err) {
      toast.error('Save request failed');
    }
  };

  const handleCrudDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/${type}s/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
        fetchPortfolioData();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Delete failed');
      }
    } catch (err) {
      toast.error('Delete request failed');
    }
  };

  // Helper to open Edit Form
  const openEdit = (type, item) => {
    setEditingItem({ type, item });
    setIsAdding(null);
    if (type === 'experience') setExpForm({ ...item });
    if (type === 'education') setEduForm({ ...item });
    if (type === 'project') setProjForm({ ...item, techStack: item.techStack.join(', ') });
    if (type === 'achievement') setAchForm({ ...item });
  };

  // Helper to open Add Form
  const openAdd = (type) => {
    setIsAdding(type);
    setEditingItem(null);
    if (type === 'experience') setExpForm({ title: '', company: '', duration: '', location: '', description: '', logoUrl: '', orderIndex: 0 });
    if (type === 'education') setEduForm({ institution: '', degree: '', duration: '', location: '', orderIndex: 0 });
    if (type === 'project') setProjForm({ title: '', subtitle: '', techStack: '', description: '', imageUrl: '', githubUrl: '', liveUrl: '', orderIndex: 0 });
    if (type === 'achievement') setAchForm({ title: '', description: '', date: '', imageUrl: '', orderIndex: 0 });
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-title">Portfolio Manager</div>
          <div className="login-subtitle">Sign in to control your portfolio content</div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary">Sign In</button>
          </form>
        </div>
        <ToastContainer theme="dark" />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Admin Dashboard</h1>
          <p>Logged in as {loginForm.username}</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-navigation">
        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => { setActiveTab('profile'); setEditingItem(null); setIsAdding(null); }}>Profile & Skills</button>
        <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => { setActiveTab('experience'); setEditingItem(null); setIsAdding(null); }}>Work Experience</button>
        <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => { setActiveTab('education'); setEditingItem(null); setIsAdding(null); }}>Education</button>
        <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => { setActiveTab('projects'); setEditingItem(null); setIsAdding(null); }}>Projects</button>
        <button className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => { setActiveTab('achievements'); setEditingItem(null); setIsAdding(null); }}>Achievements</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#a1a1aa' }}>Loading data...</div>
      ) : (
        <>
          {/* PROFILE PANEL */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave}>
              <div className="panel-card">
                <div className="panel-header">
                  <h2>Personal Information</h2>
                </div>
                <div className="grid-cols-2">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={portfolioData.profile.name}
                      onChange={(e) => setPortfolioData({ ...portfolioData, profile: { ...portfolioData.profile, name: e.target.value } })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Professional Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={portfolioData.profile.title}
                      onChange={(e) => setPortfolioData({ ...portfolioData, profile: { ...portfolioData.profile, title: e.target.value } })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio Paragraph</label>
                  <textarea
                    rows="4"
                    className="form-control"
                    value={portfolioData.profile.bio}
                    onChange={(e) => setPortfolioData({ ...portfolioData, profile: { ...portfolioData.profile, bio: e.target.value } })}
                    required
                  />
                </div>

                <div className="grid-cols-2">
                  <div className="form-group">
                    <label>Profile Picture</label>
                    <div className="upload-wrapper">
                      {portfolioData.profile.profilePicUrl && (
                        <img src={portfolioData.profile.profilePicUrl.startsWith('http') ? portfolioData.profile.profilePicUrl : `${API_BASE}${portfolioData.profile.profilePicUrl}`} className="preview-thumb" alt="Profile" />
                      )}
                      <div className="upload-btn-wrapper">
                        <button type="button" className="btn-upload">Choose Image</button>
                        <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], 'profilePicUrl')} accept="image/*" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Resume PDF</label>
                    <div className="upload-wrapper">
                      {portfolioData.profile.resumeUrl && (
                        <span style={{ fontSize: '12px', color: '#a1a1aa' }}>Resume Uploaded</span>
                      )}
                      <div className="upload-btn-wrapper">
                        <button type="button" className="btn-upload">Choose PDF</button>
                        <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], 'resumeUrl')} accept=".pdf" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid-cols-2">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={portfolioData.profile.email}
                      onChange={(e) => setPortfolioData({ ...portfolioData, profile: { ...portfolioData.profile, email: e.target.value } })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Collaboration Availability</label>
                    <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                      <input
                        type="checkbox"
                        id="availability"
                        style={{ width: '20px', height: '20px', marginRight: '10px' }}
                        checked={portfolioData.profile.availability}
                        onChange={(e) => setPortfolioData({ ...portfolioData, profile: { ...portfolioData.profile, availability: e.target.checked } })}
                      />
                      <label htmlFor="availability" style={{ margin: 0, color: '#f4f4f5' }}>Available for projects</label>
                    </div>
                  </div>
                </div>

                <div className="grid-cols-2">
                  <div className="form-group">
                    <label>GitHub Profile Link</label>
                    <input
                      type="url"
                      className="form-control"
                      value={portfolioData.profile.github}
                      onChange={(e) => setPortfolioData({ ...portfolioData, profile: { ...portfolioData.profile, github: e.target.value } })}
                    />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn Profile Link</label>
                    <input
                      type="url"
                      className="form-control"
                      value={portfolioData.profile.linkedin}
                      onChange={(e) => setPortfolioData({ ...portfolioData, profile: { ...portfolioData.profile, linkedin: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Twitter/X Profile Link</label>
                  <input
                    type="url"
                    className="form-control"
                    value={portfolioData.profile.twitter}
                    onChange={(e) => setPortfolioData({ ...portfolioData, profile: { ...portfolioData.profile, twitter: e.target.value } })}
                  />
                </div>
              </div>

              {/* SKILLS SUBSECTION */}
              <div className="panel-card">
                <div className="panel-header">
                  <h2>Manage Skills</h2>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '20px' }}>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <label>Skill Name (e.g. React, Python)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter skill name..."
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                  </div>
                  <button type="button" className="btn-add" onClick={handleAddSkill} style={{ height: '42px' }}>Add Skill</button>
                </div>

                <div className="skills-grid">
                  {portfolioData.profile.skills.map((skill, index) => (
                    <div key={index} className="skill-chip">
                      <img src={skill.logoUrl && (skill.logoUrl.startsWith('http') ? skill.logoUrl : `${API_BASE}${skill.logoUrl}`)} alt={skill.name} />
                      <span>{skill.name}</span>
                      <button type="button" onClick={() => handleRemoveSkill(index)}>&times;</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary" style={{ width: '200px' }}>Save Profile & Skills</button>
              </div>
            </form>
          )}

          {/* WORK EXPERIENCE PANEL */}
          {activeTab === 'experience' && (
            <div>
              {!isAdding && !editingItem ? (
                <div className="panel-card">
                  <div className="panel-header">
                    <h2>Work Experiences</h2>
                    <button className="btn-add" onClick={() => openAdd('experience')}>+ Add New</button>
                  </div>
                  <div className="item-list">
                    {portfolioData.experiences.length === 0 ? (
                      <p style={{ color: '#a1a1aa', fontSize: '14px' }}>No experiences added yet.</p>
                    ) : (
                      portfolioData.experiences.map((exp) => (
                        <div key={exp._id} className="item-row">
                          <div className="item-info">
                            <h4>{exp.title} at {exp.company}</h4>
                            <p>{exp.duration} | {exp.location}</p>
                          </div>
                          <div className="item-actions">
                            <button className="btn-action btn-edit" onClick={() => openEdit('experience', exp)}>Edit</button>
                            <button className="btn-action btn-delete" onClick={() => handleCrudDelete('experience', exp._id)}>Delete</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="panel-card">
                  <div className="panel-header">
                    <h2>{isAdding ? 'Add Work Experience' : 'Edit Work Experience'}</h2>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); handleCrudSave('experience', editingItem?.item?._id); }}>
                    <div className="grid-cols-2">
                      <div className="form-group">
                        <label>Job Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={expForm.title}
                          onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Company Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={expForm.company}
                          onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid-cols-2">
                      <div className="form-group">
                        <label>Duration / Period (e.g. May 2024 - Aug 2024)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={expForm.duration}
                          onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Location (e.g. Bengaluru, India)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={expForm.location}
                          onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid-cols-2">
                      <div className="form-group">
                        <label>Company Logo</label>
                        <div className="upload-wrapper">
                          {expForm.logoUrl && (
                            <img src={expForm.logoUrl.startsWith('http') ? expForm.logoUrl : `${API_BASE}${expForm.logoUrl}`} className="preview-thumb" alt="Company logo" />
                          )}
                          <div className="upload-btn-wrapper">
                            <button type="button" className="btn-upload">Upload Logo</button>
                            <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], 'logoUrl', 'experience')} accept="image/*" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Sorting Order Index (low numbers display first)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={expForm.orderIndex}
                          onChange={(e) => setExpForm({ ...expForm, orderIndex: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Job Description</label>
                      <textarea
                        rows="5"
                        className="form-control"
                        value={expForm.description}
                        onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={() => { setIsAdding(null); setEditingItem(null); }}>Cancel</button>
                      <button type="submit" className="btn-primary" style={{ width: '120px' }}>Save</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* EDUCATION PANEL */}
          {activeTab === 'education' && (
            <div>
              {!isAdding && !editingItem ? (
                <div className="panel-card">
                  <div className="panel-header">
                    <h2>Education History</h2>
                    <button className="btn-add" onClick={() => openAdd('education')}>+ Add New</button>
                  </div>
                  <div className="item-list">
                    {portfolioData.educations.length === 0 ? (
                      <p style={{ color: '#a1a1aa', fontSize: '14px' }}>No education records added yet.</p>
                    ) : (
                      portfolioData.educations.map((edu) => (
                        <div key={edu._id} className="item-row">
                          <div className="item-info">
                            <h4>{edu.degree}</h4>
                            <p>{edu.institution} | {edu.duration}</p>
                          </div>
                          <div className="item-actions">
                            <button className="btn-action btn-edit" onClick={() => openEdit('education', edu)}>Edit</button>
                            <button className="btn-action btn-delete" onClick={() => handleCrudDelete('education', edu._id)}>Delete</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="panel-card">
                  <div className="panel-header">
                    <h2>{isAdding ? 'Add Education' : 'Edit Education'}</h2>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); handleCrudSave('education', editingItem?.item?._id); }}>
                    <div className="form-group">
                      <label>Degree / Certificate (e.g. B.Tech in CSE)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={eduForm.degree}
                        onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Institution Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={eduForm.institution}
                        onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid-cols-2">
                      <div className="form-group">
                        <label>Duration / Period (e.g. 2021 - 2025)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={eduForm.duration}
                          onChange={(e) => setEduForm({ ...eduForm, duration: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Location (e.g. Raipur, India)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={eduForm.location}
                          onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Sorting Order Index</label>
                      <input
                        type="number"
                        className="form-control"
                        value={eduForm.orderIndex}
                        onChange={(e) => setEduForm({ ...eduForm, orderIndex: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={() => { setIsAdding(null); setEditingItem(null); }}>Cancel</button>
                      <button type="submit" className="btn-primary" style={{ width: '120px' }}>Save</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* PROJECTS PANEL */}
          {activeTab === 'projects' && (
            <div>
              {!isAdding && !editingItem ? (
                <div className="panel-card">
                  <div className="panel-header">
                    <h2>Projects</h2>
                    <button className="btn-add" onClick={() => openAdd('project')}>+ Add New</button>
                  </div>
                  <div className="item-list">
                    {portfolioData.projects.length === 0 ? (
                      <p style={{ color: '#a1a1aa', fontSize: '14px' }}>No projects added yet.</p>
                    ) : (
                      portfolioData.projects.map((proj) => (
                        <div key={proj._id} className="item-row">
                          <div className="item-info">
                            <h4>{proj.title}</h4>
                            <p>{proj.subtitle}</p>
                          </div>
                          <div className="item-actions">
                            <button className="btn-action btn-edit" onClick={() => openEdit('project', proj)}>Edit</button>
                            <button className="btn-action btn-delete" onClick={() => handleCrudDelete('project', proj._id)}>Delete</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="panel-card">
                  <div className="panel-header">
                    <h2>{isAdding ? 'Add Project' : 'Edit Project'}</h2>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); handleCrudSave('project', editingItem?.item?._id); }}>
                    <div className="grid-cols-2">
                      <div className="form-group">
                        <label>Project Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={projForm.title}
                          onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Subtitle / Description Tagline</label>
                        <input
                          type="text"
                          className="form-control"
                          value={projForm.subtitle}
                          onChange={(e) => setProjForm({ ...projForm, subtitle: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tech Stack (Comma-separated list, e.g. React, Express, MongoDB)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projForm.techStack}
                        onChange={(e) => setProjForm({ ...projForm, techStack: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid-cols-2">
                      <div className="form-group">
                        <label>Project Screenshot / Image</label>
                        <div className="upload-wrapper">
                          {projForm.imageUrl && (
                            <img src={projForm.imageUrl.startsWith('http') ? projForm.imageUrl : `${API_BASE}${projForm.imageUrl}`} className="preview-thumb" alt="Project screenshot" />
                          )}
                          <div className="upload-btn-wrapper">
                            <button type="button" className="btn-upload">Upload Screenshot</button>
                            <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], 'imageUrl', 'project')} accept="image/*" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Sorting Order Index</label>
                        <input
                          type="number"
                          className="form-control"
                          value={projForm.orderIndex}
                          onChange={(e) => setProjForm({ ...projForm, orderIndex: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                    <div className="grid-cols-2">
                      <div className="form-group">
                        <label>GitHub Repository URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={projForm.githubUrl}
                          onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Live Demo URL (optional)</label>
                        <input
                          type="url"
                          className="form-control"
                          value={projForm.liveUrl}
                          onChange={(e) => setProjForm({ ...projForm, liveUrl: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Project Description Detail</label>
                      <textarea
                        rows="4"
                        className="form-control"
                        value={projForm.description}
                        onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={() => { setIsAdding(null); setEditingItem(null); }}>Cancel</button>
                      <button type="submit" className="btn-primary" style={{ width: '120px' }}>Save</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ACHIEVEMENTS PANEL */}
          {activeTab === 'achievements' && (
            <div>
              {!isAdding && !editingItem ? (
                <div className="panel-card">
                  <div className="panel-header">
                    <h2>Achievements & Awards</h2>
                    <button className="btn-add" onClick={() => openAdd('achievement')}>+ Add New</button>
                  </div>
                  <div className="item-list">
                    {portfolioData.achievements.length === 0 ? (
                      <p style={{ color: '#a1a1aa', fontSize: '14px' }}>No achievements added yet.</p>
                    ) : (
                      portfolioData.achievements.map((ach) => (
                        <div key={ach._id} className="item-row">
                          <div className="item-info">
                            <h4>{ach.title}</h4>
                            <p>{ach.date}</p>
                          </div>
                          <div className="item-actions">
                            <button className="btn-action btn-edit" onClick={() => openEdit('achievement', ach)}>Edit</button>
                            <button className="btn-action btn-delete" onClick={() => handleCrudDelete('achievement', ach._id)}>Delete</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="panel-card">
                  <div className="panel-header">
                    <h2>{isAdding ? 'Add Achievement' : 'Edit Achievement'}</h2>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); handleCrudSave('achievement', editingItem?.item?._id); }}>
                    <div className="grid-cols-2">
                      <div className="form-group">
                        <label>Achievement Title / Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={achForm.title}
                          onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Date / Period (e.g. Oct 2023)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={achForm.date}
                          onChange={(e) => setAchForm({ ...achForm, date: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid-cols-2">
                      <div className="form-group">
                        <label>Award Certificate / Photo</label>
                        <div className="upload-wrapper">
                          {achForm.imageUrl && (
                            <img src={achForm.imageUrl.startsWith('http') ? achForm.imageUrl : `${API_BASE}${achForm.imageUrl}`} className="preview-thumb" alt="Achievement photo" />
                          )}
                          <div className="upload-btn-wrapper">
                            <button type="button" className="btn-upload">Upload Photo</button>
                            <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], 'imageUrl', 'achievement')} accept="image/*" />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Sorting Order Index</label>
                        <input
                          type="number"
                          className="form-control"
                          value={achForm.orderIndex}
                          onChange={(e) => setAchForm({ ...achForm, orderIndex: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Brief Description</label>
                      <textarea
                        rows="3"
                        className="form-control"
                        value={achForm.description}
                        onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={() => { setIsAdding(null); setEditingItem(null); }}>Cancel</button>
                      <button type="submit" className="btn-primary" style={{ width: '120px' }}>Save</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </>
      )}
      <ToastContainer theme="dark" />
    </div>
  );
}

export default AdminDashboard;
