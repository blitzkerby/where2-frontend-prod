import React, { useState } from 'react';
import axios from 'axios';
import Button from './ButtonComponent';
import FormInput from './InputField';
import config from './../../config';

const CreateDiscussion = ({ onDiscussionCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(config.community.postDiscussion, formData);
      setFormData({ title: '', content: '' });
      if (onDiscussionCreated) {
        onDiscussionCreated(response.data);
      }
    } catch (error) {
      console.error('Error creating discussion:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl my-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Discussion</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter discussion title"
          autoComplete="off"
        />
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            placeholder="Write your discussion content here..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            onClick={() => setFormData({ title: '', content: '' })}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Discussion'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDiscussion;