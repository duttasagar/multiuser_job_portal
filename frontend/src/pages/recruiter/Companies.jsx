import { useEffect, useState } from "react";
import { getCompanies } from "../../services/companyService";

import CompanyTable from "../../components/company/CompanyTable";
import CompanyForm from "../../components/company/CompanyForm";

export default function Companies() {
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(null);

  const loadCompanies = async () => {
    try {
      setLoading(true);

      const res = await getCompanies();

      setCompanies(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleAddCompany = () => {
    setSelectedCompany(null);

    setIsOpen(true);
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);

    setIsOpen(true);
  };

  // return (
  //   <div className="p-6">
  //     <div className="flex items-center justify-between py-3 px-4 mb-5 bg-white rounded-xl shadow-sm border border-slate-200 ">
  //       <div className="">
  //         <h1 className="text-3xl font-bold text-slate-800">Companies</h1>

  //         <p className="text-slate-500 mt-1">
  //           Manage your registered companies.
  //         </p>
  //       </div>

  //       <button
  //         onClick={handleAddCompany}
  //         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
  //       >
  //         + Add Company
  //       </button>
  //     </div>

  //     <CompanyForm
  //       isOpen={isOpen}
  //       onClose={() => setIsOpen(false)}
  //       selectedCompany={selectedCompany}
  //       loadCompanies={loadCompanies}
  //     />

  //     <CompanyTable
  //       companies={companies}
  //       loading={loading}
  //       onEdit={handleEdit}
  //       loadCompanies={loadCompanies}
  //     />
  //   </div>
  // );

return (
  <div className="p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-4 mb-5 bg-white rounded-xl shadow-sm border border-slate-200">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Companies
        </h1>

        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Manage your registered companies.
        </p>
      </div>

      <button
        onClick={handleAddCompany}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
      >
        + Add Company
      </button>
    </div>

    <CompanyForm
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      selectedCompany={selectedCompany}
      loadCompanies={loadCompanies}
    />

    <CompanyTable
      companies={companies}
      loading={loading}
      onEdit={handleEdit}
      loadCompanies={loadCompanies}
    />
  </div>
);


}
