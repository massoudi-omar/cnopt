import axios from "axios";
import axiosInstance, { clickToPay, password, username } from "../helpers/config";

type SigninData = {
  NumeroInscription: string;
  MotDePasse: string;
};

type SigninResponse = any;

const auth = {
  signin: async (data: SigninData): Promise<SigninResponse> => {
    const response = await axiosInstance.post<SigninResponse>("/api/pharmacienLogin", data);
    return response.data;
  },

  signup: async (data: any): Promise<SigninResponse> => {
    const response = await axiosInstance.post<SigninResponse>("/api/pharmacienRegister", data);
    return response.data;
  },
};


const user = {
  details: async (NumeroInscription: any) => {
    const response = await axiosInstance.get(`/api/getPharmacien?NumeroInscription=${NumeroInscription}`);
    return response.data;
  },

  cotisation: async (NumeroInscription: any) => {
    const response = await axiosInstance.get(`/api/getPharmacienCotisation?NumeroInscription=${NumeroInscription}`);
    return response.data;
  },

  photo: async (NumeroInscription: any) => {
    const response = await axiosInstance.get(`/api/getPharmacien?NumeroInscription=${NumeroInscription}`);
    return response.data.Photo;
  },


  activitiesInfo: async (NumeroInscription: any) => {
    const response = await axiosInstance.get(`/api/getPharmacien?NumeroInscription=${NumeroInscription}`);
    return response.data.Activite[0];
  },

  attestationFile: async (type: any, NumeroInscription: any, year: any) => {
    const response = await axiosInstance.get(`/api/getAttestation?code=${type}&NumeroInscription=${NumeroInscription}&Date=${year}-01-01`, { responseType: "arraybuffer" });
    return response.data;
  },

  attestationList: async (NumeroInscription: any) => {
    const response = await axiosInstance.get(`/api/getListAttestation?NumeroInscription=${NumeroInscription}`);
    return response.data;
  },

  demande: async (NumeroInscription: any) => {
    const response = await axiosInstance.post(`/api/addDemandeAttestation?NumeroInscription=${NumeroInscription}`);
    return response.data;
  },

  uploadPhoto: async (data: any) => {
    const response = await axiosInstance.post(`/api/updatePharmacienPhoto`, data, { headers: { "Content-Type": "application/octet-stream" }, });
    return response.data;
  },

  updatePassword: async (data: any) => {
    const response = await axiosInstance.post(`/api/pharmacienRegister`, data);
    return response.data;
  },
  update: async (data: any) => {
    const response = await axiosInstance.post(`/api/updatePharmacien`, data);
    return response.data;
  }

};

const documents = {
  list: async () => {
    const response = await axiosInstance.get(`/api/getDocumentList`);
    return response.data;
  },

  download: async (id: any) => {
    const response = await axiosInstance.get(`/api/getDocument?ID=${id}`);
    return response.data;
  },
}

const notification = {
  list: async (id: any) => {
    const response = await axiosInstance.get(`/api/getPharmacienNotification?NumeroInscription=${id}`);
    return response.data;
  },

  delete: async (data: any) => {
    const response = await axiosInstance.post(`/api/deletePharmacienNotification`, data);
    return response.data;
  },

}

const pharmacie = {
  list: async () => {
    const response = await axiosInstance.get(`/api/getPharmaciesOnSale`);
    return response.data;
  },

  get: async (id: any) => {
    const response = await axiosInstance.get(`/api/getPharmacien?NumeroInscription=${id}`);
    return response.data.Pharmacie;
  },

  update: async (data: any) => {
    const response = await axiosInstance.post(`/api/updatePharmacieStatus`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.Pharmacie;
  }
}

const paiment = {
  pay: async (total: any) => {
    const response = await axios.post(clickToPay + `/payment/rest/register.do?userName=${username}&amount=${total * 1000}&language=en&orderNumber=${Math.floor(Math.random() * 10000000000)}&password=${password}&returnUrl=https://pharmacien.cnopt.tn/status_check&failUrl=https://pharmacien.cnopt.tn/failed_check`);
    return response.data;
  },
  receit: async (id: any) => {
    const response = await axiosInstance.post(`/api/getPaymentReceipt?ID=${id}`, {});
    return response.data;
  }
}

export const API = {
  auth,
  user,
  documents,
  notification,
  pharmacie,
  paiment
};
