import React, { useState } from 'react'
import { DashboardSidebar, DashboardTop, FilePreviewModal } from '../components'
import { Outlet } from 'react-router-dom'

const DashboardPage = () => {

  const [previewFile, setPreviewFile] = useState(null);

  const handleViewFile = (file) => {
    setPreviewFile(file);
  };

  const handleClosePreview = () => {
    setPreviewFile(null); 
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      <div className="flex-none z-10">
        <DashboardTop />
      </div>

      <div
        className="flex flex-1 bg-[#f1f3f5] gap-4 md:gap-8 p-4 md:p-8 overflow-hidden"
        style={{
          borderTopLeftRadius: '40px',
          borderTopRightRadius: '40px'
        }}
      >
        <div className="flex-none self-start">
          <DashboardSidebar />
        </div>

        <div className="flex-1 h-full overflow-y-auto rounded-3xl">
          <div className="min-h-full bg-white rounded-3xl p-4 shadow-md">
            <Outlet context={{ onViewFile: handleViewFile }} />
          </div>
        </div>
      </div>

      {previewFile && (
        <FilePreviewModal file={previewFile} onClose={handleClosePreview} />
      )}

    </div>
  )
}

export default DashboardPage
