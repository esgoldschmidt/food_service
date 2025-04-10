'use client'
import { useState, useEffect } from "react";

import { Vendor } from "@prisma/client";
import AddVendorForm from "@/components/forms/AddVendor";

const VendorsPage = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [visibleVendors, setVisibleVendors] = useState<string[]>([]);
  const [isAddingVendor, setIsAddingVendor] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch('/api/vendors');
  
        if (!res.ok) {
          throw new Error(`Failed to fetch vendors: ${res.statusText}`);
        }
  
        // Check if the response body is empty before attempting to parse
        const text = await res.text();
        const data = text ? JSON.parse(text) : [];
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
  
    fetchVendors();
  }, []);
  const toggleVendor = (vendorName: string) => {
    setVisibleVendors((prevState) => {
      if (prevState.includes(vendorName)) {
        return prevState.filter((name) => name !== vendorName);
      } else {
        return [...prevState, vendorName];
      }
    });
  };

  const toggleAddVendorForm = () => {
    setIsAddingVendor(!isAddingVendor);
  };

  return (
    <div>
        <div>
          <h1>Vendor List</h1>
          {vendors.map((vendor) => (
            <div key={vendor.id}>
              <button onClick={() => toggleVendor(vendor.name)}>
                {visibleVendors.includes(vendor.name) ? 'Hide' : 'Show'} {vendor.name}
              </button>
              {visibleVendors.includes(vendor.name) && (
                <div>
                  <p>Name: {vendor.name}</p>
                  <p>Category: {vendor.phone}</p>
                  <p>Email 1: {vendor.email1}</p>
                  <p>Email 2: {vendor.email2}</p>
                  <p>Email 3: {vendor.email3}</p>
                  <p>Email 4: {vendor.email4}</p>
                  <p>Is Paid By CC: {vendor.isPaidByCC}</p>
                  <p>Contact Name: {vendor.contactName}</p>
                 
                  {/* Add other vendor details here */}
                </div>
              )}
            </div>
          ))}
          {/* Button to open the form */}
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={toggleAddVendorForm}
          >
            Add New Vendor
          </button>
          {/* Render form if adding vendor */}
          {isAddingVendor && <AddVendorForm closeForm={toggleAddVendorForm} />}
        </div>
    </div>
  );
};

export default VendorsPage;