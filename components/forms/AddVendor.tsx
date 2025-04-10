import { useState } from 'react';

interface AddVendorFormProps {
  closeForm: () => void;
}

// this needs to be adjusted so accout number is a locations specific function. Need to create locations first. 

const AddVendorForm: React.FC<AddVendorFormProps> = ({ closeForm }) => {
  // State for all the vendor fields
  const [vendorName, setVendorName] = useState('');
  const [category, setCategory] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [email3, setEmail3] = useState('');
  const [email4, setEmail4] = useState('');
  const [accountNumberAveI, setAccountNumberAveI] = useState('');
  const [accountNumberConey, setAccountNumberConey] = useState('');
  const [isPaidByCC, setIsPaidByCC] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare the data to be sent
      const vendorData = {
        name: vendorName,
        category,
        contactName,
        phone,
        email1,
        email2,
        email3,
        email4,
        accountNumberAveI,
        accountNumberConey,
        isPaidByCC
      };

      // Make API call to add or update the vendor using fetch
      const apiUrl = '/api/vendors';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add/update vendor: ${response.statusText}`);
      }

      // Close the form after successful submission
      closeForm();
      alert('Vendor added/updated successfully!');
    } catch (error) {
      console.error('Error adding vendor:', error);
      alert('There was an error adding the vendor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-4">Add or Edit Vendor</h2>

      <div className="mb-2">
        <label className="block">Vendor Name</label>
        <input
          type="text"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Contact Name</label>
        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Email 1</label>
        <input
          type="email"
          value={email1}
          onChange={(e) => setEmail1(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Email 2</label>
        <input
          type="email"
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Email 3</label>
        <input
          type="email"
          value={email3}
          onChange={(e) => setEmail3(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Email 4</label>
        <input
          type="email"
          value={email4}
          onChange={(e) => setEmail4(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Account Number Ave I</label>
        <input
          type="text"
          value={accountNumberAveI}
          onChange={(e) => setAccountNumberAveI(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block">Account Number Coney</label>
        <input
          type="text"
          value={accountNumberConey}
          onChange={(e) => setAccountNumberConey(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-medium mb-1">Paid By Credit Card?</label>
        <div className="flex gap-4">
            <label className="flex items-center gap-1">
            <input
                type="radio"
                name="isPaidByCC"
                value="true"
                checked={isPaidByCC === true}
                onChange={() => setIsPaidByCC(true)}
            />
            Yes
            </label>
            <label className="flex items-center gap-1">
            <input
                type="radio"
                name="isPaidByCC"
                value="false"
                checked={isPaidByCC === false}
                onChange={() => setIsPaidByCC(false)}
            />
            No
            </label>
        </div>
        </div>

      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Vendor
        </button>
        <button
          type="button"
          onClick={closeForm}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddVendorForm;