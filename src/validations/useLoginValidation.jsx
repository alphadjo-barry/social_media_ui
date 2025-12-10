import { object, string } from "yup";

export function useLoginValidation() {
  const loginSchema = object({
    email: string()
      .required("L'email est requis") // Message d'erreur personnalisé
      .email("L'email doit être valide"), // Validation de l'email
    password: string()
      .required("Le mot de passe est requis") // Message d'erreur personnalisé
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"), // Longueur minimale du mot de passe
  });

  return { loginSchema };
}
