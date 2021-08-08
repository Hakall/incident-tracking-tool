import { RelayPoint } from "./relayPoint";
import { Species } from "./species";

export enum IncidentCause {
  LEAK = "Fuite",
  OPEN = "Ouvert",
  DELAY = "Retard",
  LATE_NEXT_DAY = "Retard au lendemain",
  MISSING_LOCKER = "Casier manquant",
  TEMPERATURE = "Température",
  PARTIAL_DELIVERY = "Livraison partielle",
  WRONG_ADDRESS = "Livraison à la mauvaise adresse",
  UNDELIVERED = "Non livré",
  EQUIPMENT = "Équipement",
  CLOSING = "Fermeture",
  INVERSION = "Inversion",
  WEIGHT = "Poids",
  LACK = "Manque",
  FRESHNESS = "Fraicheur",
  MORTALITY = "Mortalité",
  CUTTING = "Découpe",
  DIVERSITY = "Diversité",
  NOT_EMPTIED = "Non vidé",
  TOWARDS = "Vers",
  SAND = "Sable",
  OVERSIGHT = "Oubli",
  PAYMENT = "Paiement",
  DISSATISAFCTION = "Insatisfaction",
  BROWSER = "Navigateur",
  MAIL_NOT_RECEIVED = "Email non reçu",
  IMPOSSIBLE_ORDER = "Commande impossible",
  SHIPPING_COST = "Frais de livraison",
  OTHER = "Autre",
}

export enum IncidentType {
  CONDITIONING = "Conditionnement",
  DELIVERY = "Livraison",
  RELAY_POINT = "Point Relais",
  PRODUCT = "Produit",
  CUSTOMER = "Client",
  ETRADE = "E-commerce",
}

export enum IncidentResolution {
  MAIL = "Email",
  PHONE_CALL = "Appel téléphonique",
  PARTIAL_REFUND = "Remboursement partiel",
  REFUND = "Remboursement total",
}

export interface Incident {
  _id: string;
  emails: string[];
  relayPoint: RelayPoint;
  date: Date;
  type: IncidentType;
  cause: IncidentCause;
  species?: Species;
  resolution: IncidentResolution;
  refundAmount?: number;
  comment?: string;
}
