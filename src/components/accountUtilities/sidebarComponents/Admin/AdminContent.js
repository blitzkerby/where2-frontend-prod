import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Save, Image, Link, FileText, MapPin } from 'lucide-react';
import ButtonComponent from '../../../reusable/Button';
import axios from 'axios';
import config from '../../../../config';

const UniversityAdminEditor = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [links, setLinks] = useState([
    { title: 'Telegram', url: '' },
    { title: 'Facebook', url: '' },
    { title: 'Instagram', url: '' },
    { title: 'Website', url: '' },
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('universityData'));
    if (savedData) {
      setImageUrl(savedData.imageUrl || '');
      setUniversityName(savedData.universityName || '');
      setDescription(savedData.description || '');
      setLocation(savedData.location || '');
      setLinks(savedData.links || [
        { title: 'Telegram', url: '' },
        { title: 'Facebook', url: '' },
        { title: 'Instagram', url: '' },
        { title: 'Website', url: '' },
      ]);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = 'Please save all changes before reloading if you don\'t want to remove them.';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const removeLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleApplyChanges = async () => {
    handleSaveChanges();
    alert('Changes saved successfully');

    const data = {
      name: universityName,
      description: description,
      facebook_url: links.find(link => link.title === 'Facebook')?.url || '',
      instagram_url: links.find(link => link.title === 'Instagram')?.url || '',
      telegram_url: links.find(link => link.title === 'Telegram')?.url || '',
      website: links.find(link => link.title === 'Website')?.url || '',
      image_url: imageUrl,
      image_alt: universityName,
      location: location
    };

    console.log('Sending the following data to the server:', data);

    try {
      const response = await axios.post(config.contentCreateion.createUniversity, data);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error saving changes:', error.response ? error.response.data : error.message);
    }
  };

  const handleSaveChanges = () => {
    const data = {
      imageUrl,
      universityName,
      description,
      links,
      location
    };
    console.log('Saving the following data:', data);
    localStorage.setItem('universityData', JSON.stringify(data));
  };
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-800">University Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <Image size={24} className="mr-2" />
            University Image
          </h2>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {imageUrl ? (
            <img src={imageUrl} alt="University" className="w-full h-48 rounded  object-contain"/>
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
              No image uploaded
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <FileText size={24} className="mr-2" />
            University Details
          </h2>
          <input
            type="text"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="University Name"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="University Description"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <MapPin size={24} className="mr-2" />
            University Location
          </h2>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder=""
          />
          <p>Example: (Province or City) / Country / District</p>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
          <Link size={24} className="mr-2" />
          Important Links
        </h2>
        {links.map((link, index) => (
          <div key={index} className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              value={link.title}
              onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
              placeholder={`${link.title}`}
              className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              placeholder="Link URL"
              className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              onClick={() => removeLink(index)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={handleSaveChanges}
        className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 flex items-center justify-center text-lg font-semibold"
      >
        <Save size={24} />
        <span className="ml-2">Save All Changes</span>
      </button>

      <ButtonComponent className={`mt-[20px]`} onClick={handleApplyChanges}>
        Apply Changes
      </ButtonComponent>
    </div>
  );
};

export default UniversityAdminEditor;
