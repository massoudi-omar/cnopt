import { useEffect, useState } from "react";
import ProfileCard from "../../../components/profile/ProfileCard";
import ProfileInfo from "../../../components/profile/ProfileInfo";
import { API } from "../../../services/api";
import { useAuth } from "../../../ctx/AuthContext";

export default function Information() {
  let { user } = useAuth()
  let [userProfile, setUserProfile] = useState({})
  let [personnelInformations, setpersonnelInformations] = useState({})

  useEffect(() => {
    fetchUserDetails()
  }, [])

  let fetchUserDetails = async () => {
    try {
      let numInscri;
      if (user) numInscri = user.NumeroInscription
      let data = await API.user.details(numInscri)
      let userInfo = {
        photo: data.Photo,
        codeAppellation: data.CodeAppellation,
        nom: data.Nom,
        cin: data.CIN,
        prenom: data.Prenom,
        lieuNaissance: data.LieuNaissance,
        dateNaissance: data.DateNaissance,
        numeroInscription: data.NumeroInscription,

      };
      setUserProfile(userInfo)

      let personnelInfos = {
        dateNaissance: data.DateNaissance,
        lieuNaissance: data.LieuNaissance,
        lieuNaissanceArabe: data.LieuNaissanceArabe,
        nationalite: data.Nationalite,
        nationaliteArabe: data.NationaliteArabe,

        emailPersonnel: data.EmailPersonnel,
        gouvernoratPersonnel: data.GouvernoratPersonnel,
        gouvernoratPersonnelArabe: data.GouvernoratPersonnelArabe,
        villeAdressePersonnelle: data.VilleAdressePersonnelle,
        villeAdressePersonnelleArabe: data.VilleAdressePersonnelleArabe,
        adressePersonnelle: data.AdressePersonnelle,
        aressePersonnelleArabe: data.AdressePersonnelleArabe,
        telFixePersonnel: data.TelFixePersonnel,
        telMobilePersonnel: data.TelMobilePersonnel,
        numeroInscription: data.NumeroInscription,


      }

      setpersonnelInformations(personnelInfos)


    } catch (err) {
      console.log(err);

    }
  }


  return (
    <div className="flex flex-col gap-10 ">
      {/* Photo + Change Photo */}
      <ProfileCard userProfile={userProfile} fetchUserDetails={fetchUserDetails} />

      {/* Editable Personal Information */}
      <ProfileInfo personnelInformations={personnelInformations} />
    </div>
  );
}
