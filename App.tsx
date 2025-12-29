
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CitizenView from './components/CitizenView';
import AuthorityView from './components/AuthorityView';
import { Complaint, ComplaintStatus } from './types';
import { DUMMY_COMPLAINTS } from './constants';

const App: React.FC = () => {
  const [userType, setUserType] = useState<'citizen' | 'authority'>('citizen');
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  // Initialize with dummy data
  useEffect(() => {
    const saved = localStorage.getItem('civic_complaints');
    if (saved) {
      setComplaints(JSON.parse(saved));
    } else {
      setComplaints(DUMMY_COMPLAINTS);
    }
  }, []);

  // Persist state
  useEffect(() => {
    if (complaints.length > 0) {
      localStorage.setItem('civic_complaints', JSON.stringify(complaints));
    }
  }, [complaints]);

  const addComplaint = (newComplaint: Complaint) => {
    setComplaints(prev => [newComplaint, ...prev]);
  };

  const updateStatus = (id: string, status: ComplaintStatus) => {
    setComplaints(prev => prev.map(c => 
      c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c
    ));
  };

  const toggleUser = () => {
    setUserType(prev => prev === 'citizen' ? 'authority' : 'citizen');
  };

  return (
    <Layout userType={userType} onToggleUser={toggleUser}>
      {userType === 'citizen' ? (
        <CitizenView complaints={complaints} addComplaint={addComplaint} />
      ) : (
        <AuthorityView complaints={complaints} onStatusUpdate={updateStatus} />
      )}
    </Layout>
  );
};

export default App;
