import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, Image, Link, FileText, MapPin, DollarSign, Calendar, Clock } from 'lucide-react';
import ButtonComComponent from '../../../reusable/ButtonComponent'
import axios from 'axios';
import config from '../../../../config';
import DropdownComponent from '../../../reusable/DropdownComponent';

const dropdownItems = [
  { label: 'University' },
  { label: 'Job offer' },
  { label: 'Accommodation' },
];

const entityConfig = {
  'University': {
    hasLocation: true,
    createEndpoint: config.contentCreation.createUniversity,
    additionalFields: [],
  },
  'Job offer': {
    hasLocation: true,
    createEndpoint: config.contentCreation.createJob,
    additionalFields: [
      { name: 'company_name', label: 'Company Name', type: 'text' },
      { name: 'company_id', label: 'Company id', type: 'number' },
      { name: 'job_require', label: 'Job Requirements', type: 'textarea' },
      { name: 'salary', label: 'Salary', type: 'number' },
      { name: 'position', label: 'Position', type: 'text' },
      { name: 'deadline', label: 'Application Deadline', type: 'date' },
      { name: 'work_hour', label: 'Work Hours', type: 'text' },
      
    ],
  },
  'Accommodation': {
    hasLocation: true,
    createEndpoint: config.contentCreation.createAccommodation,
    additionalFields: [
      { name: 'type', label: 'Accommodation Type', type: 'text' },
      { name: 'price', label: 'Price', type: 'text' },
      { name: 'availability', label: 'Availability', type: 'number' },
      { name: 'size', label: 'Size', type: 'text' },
      { name: 'google_map', label: 'Google Maps Link', type: 'text' },
      { name: 'contact', label: 'Contact Information', type: 'text' },
    ],
  },
};

const AdminEditor = ({ selectedEntity = localStorage.getItem('businessEntity') }) => {
  const [entity, setEntity] = useState(localStorage.getItem('businessEntity') || 'University');
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [links, setLinks] = useState([
    { title: 'Telegram', url: '' },
    { title: 'Facebook', url: '' },
    { title: 'Instagram', url: '' },
    { title: 'Website', url: '' },
  ]);
  const [additionalFields, setAdditionalFields] = useState({});

  const selectEntity = (entity) => {
    console.log(entity.label);
    localStorage.setItem('businessEntity', entity.label);
    setEntity(entity.label);
    setAdditionalFields({});
  };
  
  const entityDataKey = `${selectedEntity}Data`;

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(entityDataKey));
    if (savedData) {
      setImageUrl(savedData.imageUrl || '');
      setName(savedData.name || '');
      setDescription(savedData.description || '');
      setLocation(savedData.location || '');
      setLinks(savedData.links || [
        { title: 'Telegram', url: '' },
        { title: 'Facebook', url: '' },
        { title: 'Instagram', url: '' },
        { title: 'Website', url: '' },
      ]);
      setAdditionalFields(savedData.additionalFields || {});
    }
  }, [entityDataKey]);

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

  const handleAdditionalFieldChange = (fieldName, value) => {
    setAdditionalFields(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleApplyChanges = async () => {
    handleSaveChanges();
    alert('Changes saved successfully');

    const data = {
      name: name,
      description: description,
      facebook_url: links.find(link => link.title === 'Facebook')?.url || '',
      instagram_url: links.find(link => link.title === 'Instagram')?.url || '',
      telegram_url: links.find(link => link.title === 'Telegram')?.url || '',
      website: links.find(link => link.title === 'Website')?.url || '',
      image_url: imageUrl,
      image_alt: name,
      location: location,
      ...additionalFields,
    };

    console.log(`Sending the following ${selectedEntity} data to the server:`, data);

    try {
      const response = await axios.post(entityConfig[selectedEntity].createEndpoint, data);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error saving changes:', error.response ? error.response.data : error.message);

    }
  };

  const handleSaveChanges = () => {
    const data = {
      imageUrl,
      name,
      description,
      links,
      location,
      additionalFields,
    };
    console.log('Saving the following data:', data);
    localStorage.setItem(entityDataKey, JSON.stringify(data));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <DropdownComponent items={dropdownItems} onItemClick={selectEntity} />
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-800">
        {selectedEntity} Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <Image size={24} className="mr-2" />
            {selectedEntity} Image
          </h2>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {imageUrl ? (
            <img src={imageUrl} alt={selectedEntity} className="w-full h-48 rounded object-contain" />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
              No image uploaded
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
            <FileText size={24} className="mr-2" />
            {selectedEntity} Details
          </h2>
          <h2>Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={`${selectedEntity} Name`}
          />
          <h2>{selectedEntity} Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={`${selectedEntity} Description`}
          />
        </div>

        {entityConfig[selectedEntity].hasLocation && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
              <MapPin size={24} className="mr-2" />
              {selectedEntity} Location
            </h2>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="(Province or City) / Country / District"
            />
          </div>
        )}

        {entityConfig[selectedEntity].additionalFields.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
              <FileText size={24} className="mr-2" />
              Additional Information
            </h2>
            {entityConfig[selectedEntity].additionalFields.map((field) => (
              <div key={field.name} className="mb-4">
                <h2>{field.label}</h2>
                {field.type === 'textarea' ? (
                  <textarea
                    value={additionalFields[field.name] || ''}
                    onChange={(e) => handleAdditionalFieldChange(field.name, e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={field.label}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={additionalFields[field.name] || ''}
                    onChange={(e) => handleAdditionalFieldChange(field.name, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={field.label}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
          <Link size={24} className="mr-2" />
          Important Links
        </h2>
        {links.map((link, index) => (
          <div key={index} className="flex items-center lg:space-x-2 lg:mb-4 sm:flex-col">
            <input
              type="text"
              readOnly
              value={link.title}
              placeholder={`${link.title}`}
              className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              placeholder="Link URL"
              className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mb-5"
            />
          </div>
        ))}
      </div>

      <ButtonComComponent
        variant='success'
        onClick={handleSaveChanges}
        className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 flex items-center justify-center text-lg font-semibold"
      >
        <Save size={24} />
        <span className="ml-2">Save Changes</span>
      </ButtonComComponent>
      
      <ButtonComComponent
        onClick={handleApplyChanges}
        className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center text-lg font-semibold"
      >
        <PlusCircle size={24} />
        <span className="ml-2">Apply Changes</span>
      </ButtonComComponent>
    </div>
  );
};

export default AdminEditor;