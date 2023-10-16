import React, { useState } from 'react';
import axios from 'axios';
import './FormUpload.css';

function FormUpload() {
  const [documentId, setDocumentId] = useState('');
  const [file, setFile] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
    } else {
      alert('Por favor, selecciona un archivo de texto (.txt).');
    }
  };

  const handleUpload = () => {
    if (documentId && file) {
      setConfirmationModal(true);
    } else {
      alert('Por favor, completa el campo "Id del documento" y selecciona un archivo.');
    }
  };

  const handleConfirmUpload = async () => {
    setConfirmationModal(false);
    const formData = new FormData();
    formData.append('reune_error_file', file);
    formData.append('document_id', documentId);

    try {
      await axios.post('http://192.168.10.92/reune/upload-error-document', formData, {
        headers: {
          Authorization:
            '8340|27|Libertad Servicios Financieros, S.A. de C.V., S.F.P.|SI|NO|Sociedades Financieras Populares',
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessModal(true);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
    setFile(null);
    setDocumentId('');
  };

  const closeModal = () => {
    setConfirmationModal(false);
    setSuccessModal(false);
  };

  return (
    <div className="center-container">
      <div className="form-container">
      <label htmlFor="documentId">Id del Documento</label>
        <input className='input-field'
          type="text"
          placeholder="Id del documento"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
        />
        <label htmlFor="fileupload">Selecciona el archivo</label>
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <button onClick={handleUpload}>Subir</button>
      </div>
      {confirmationModal && (
        <div className="modal">
          <div className="modal-content modal-confirmation">
            <p>{`Desea subir el archivo seleccionado: ${file.name} con el id: ${documentId}`}</p>
            <button onClick={handleConfirmUpload}>Aceptar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
      {successModal && (
        <div className="modal">
          <div className="modal-content modal-success">
            <p>El archivo fue agregado correctamente.</p>
            <button onClick={closeModal}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormUpload;
