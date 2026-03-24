import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAuth } from '../../ctx/AuthContext';
import { baseURL, clickToPay, password, username } from '../../helpers/config';

// Generate PDF function
const generatePdf = (orderId: string | null, approvalCode: string | undefined, err: any) => {
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text('Récépissé temporaire de paiement', pdf.internal.pageSize.width / 2, 15, { align: 'center' });

    const tableData = [
        ['ERROR', err],
        ['ORDER_ID', orderId],
        ['APPROVAL_CODE', approvalCode],
    ];

    (pdf as any).autoTable({
        startY: 30,
        head: [['Key', 'Value']],
        body: tableData,
    });

    return pdf.output('dataurlstring');
};

const SuccessfulPaymentPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth()

    const searchParams = new URLSearchParams(location.search);
    const OrderId = searchParams.get('orderId');

    const [data, setData] = useState<any>();
    const [Error, setError] = useState<any>();

    // Remove orderId from URL
    const removeQueryParameter = () => {
        const { search, pathname } = location;
        const params = new URLSearchParams(search);
        params.delete('orderId');
        const newSearch = params.toString() ? `?${params.toString()}` : '';
        navigate(`${pathname}${newSearch}`, { replace: true });
    };

    // Check payment status
    const checkPayment = () => {
        axios
            .get(`${clickToPay}/payment/rest/getOrderStatus.do`, {
                params: {
                    language: 'en',
                    orderId: OrderId,
                    password: password,
                    userName: username,
                },
            })
            .then((res) => {
                setData(res.data);

                try {
                    const DecnumConnexion = user?.NumeroInscription

                    const paymentAmount = res.data?.Amount;

                    if (paymentAmount !== undefined) {
                        const requestData = {
                            NumeroInscription: DecnumConnexion,
                            Type: 'Cotisation',
                            ModePaiement: 'ClickToPay',
                            Montant: paymentAmount / 1000,
                            OrderId,
                        };

                        axios
                            .post(`${baseURL}/api/addTransaction`, requestData, {
                                headers: { 'Content-Type': 'multipart/form-data' },
                            })
                            .then((res) => {
                                try {
                                    window.location.replace(
                                        `/recu_check?APPROVAL_CODE=${res.data?.approvalCode || data?.approvalCode}&NumeroMouvement=${res.data?.NumeroMouvement}`
                                    );
                                } catch (err) {
                                    console.error(err);
                                }
                            })
                            .catch((error) => {
                                setError(error);

                                let e: any = error;
                                if (error.response) {
                                    e = error.response.data?.error || error.response.data?.message || error.response.data;
                                } else if (error.message) {
                                    e = error.message;
                                } else {
                                    e = 'Unknown error';
                                }
                                console.log(e);
                            });
                    }
                } catch (err) {
                    console.error(err);
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        checkPayment();
    }, []);

    // Generate PDF on button click
    const onButtonClick = () => {
        const pdfDataUrl = generatePdf(OrderId, data?.approvalCode, Error);
        const link = document.createElement('a');
        link.href = pdfDataUrl;
        link.download = 'Récépissé_temporaire_de_paiement.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        removeQueryParameter();
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md max-w-md mx-auto flex flex-col items-center justify-center mt-40 mb-80">
            {Error && (
                <div className="flex flex-col items-center text-center space-y-3">
                    <p className="text-gray-700">
                        Nous nous excusons pour toute perturbation. Une situation inattendue s'est produite, mais nous travaillons à la
                        résoudre. Si vous avez des inquiétudes, n'hésitez pas à nous contacter. Votre satisfaction est notre priorité,
                        et nous sommes déterminés à résoudre ce problème.
                    </p>

                    <div className="font-semibold text-[90%] w-full">ORDER_ID : {OrderId}</div>
                    <div className="font-semibold text-[90%] w-full">APPROVAL_CODE : {data?.approvalCode}</div>

                    <button
                        onClick={onButtonClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    >
                        Imprimé le code
                    </button>

                    <button
                        onClick={() => navigate('/Cotisation')}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-300"
                    >
                        Retour
                    </button>
                </div>
            )}
        </div>
    );
};

export default SuccessfulPaymentPage;