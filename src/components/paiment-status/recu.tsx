import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../services/api';
import { useToast } from '../../ctx/ToastContext';

const Recu: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast()

    const searchParams = new URLSearchParams(location.search);
    const NumeroMouvement = searchParams.get('NumeroMouvement');
    const APPROVAL_CODE = searchParams.get('APPROVAL_CODE');

    const downloadPdf = async () => {
        try {
            let data = await API.paiment.receit(NumeroMouvement)
            const blob = new Blob([data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'REÇU_DE_PAIEMENT.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            showToast("Une erreur est survenue lors du traitement du Recu de paiment.", "error");

        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md max-w-md mx-auto flex flex-col items-center justify-center mt-40 mb-80">
            <h1 className="text-gray-800 text-2xl font-bold mb-4">Paiement réussi !</h1>

            <div className="text-gray-600 flex flex-col items-center mb-4">
                <div>Paiement accepté avec succès</div>
                <div className="font-semibold mt-1">APPROVAL_CODE: {APPROVAL_CODE}</div>
            </div>

            <span
                className="underline text-blue-600 cursor-pointer mb-4"
                onClick={downloadPdf}
            >
                Télécharger le reçu
            </span>

            <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                onClick={() => navigate('/Cotisation')}
            >
                Retour
            </button>
        </div>
    );
};

export default Recu;