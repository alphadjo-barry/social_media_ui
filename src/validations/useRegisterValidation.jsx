import { number, object, string, ref } from "yup";

export function useRegisterValidation() {

  const registerSchema = object({
    lastName: string().required("Le nom de famille est obligatoire"),
    firstName: string().required("Le prénom est obligatoire"),
    email: string()
      .required("L'email est obligatoire")
      .email("L'email doit être valide"),
    phone: string()
      .required("Le numéro de téléphone est obligatoire")
      .matches(
        /^(0|\+33)[0-9](\d{2}){4}$/,
        "Le numéro au format francais uniquement"
      ),
    selectedJour: number()
      .transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      })
      .required("Le mois est obligatoire"),
    selectedMois: number()
      .transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      })
      .required("L'année est obligatoire"),
    selectedAnnee: number()
      .transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      })
      .required("Le jour est obligatoire"),
    genre: string()
      .transform((value) => (value === "" ? undefined : value))
      .required("Le genre est obligatoire"),
    password: string()
      .required("Le mot de passe est obligatoire")
      .min(8, "Le mot de passe doit comporter au moins 6 caractères"),
    confirmPassword: string()
      .required("La confirmation du mot de passe est obligatoire")
      .oneOf([ref("password"), null], "Les mots de passe doivent correspondre"),
  });

  return { registerSchema };
}
