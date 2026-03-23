import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  twilioNumber: string;
  vapiAgentId: string;
  personalPhone?: string;
  googleCalendarConnected?: boolean;
  googleRefreshToken?: string;
  whatsappApiConnected?: boolean;
  metaAccessToken?: string;
  metaAccountId?: string;
  whatsappPhoneNumber?: string;
  pabblySubscriptionId?: string;
  agents?: {
    name?: string;
    twilioNumber?: string;
    vapiAgentId?: string;
    pabblySubscriptionId?: string;
    purchasedAt?: Date;
    safetySettings?: {
      disableBooking?: boolean;
      disableSms?: boolean;
      humanFallback?: boolean;
    };
  }[];
  planMinutes?: number;
  available_credits?: number;
  referralCode?: string;
  referredBy?: string;
  elevenLabsVoiceId?: string;
  favoriteVoices?: {
    voiceId: string;
    name: string;
    preview_url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    twilioNumber: {
      type: String,
      required: false,
    },
    vapiAgentId: {
      type: String,
      required: false,
    },
    personalPhone: {
      type: String,
      required: false,
    },
    googleCalendarConnected: {
      type: Boolean,
      default: false,
    },
    googleRefreshToken: {
      type: String,
      required: false,
    },
    whatsappApiConnected: {
      type: Boolean,
      default: false,
    },
    metaAccessToken: {
      type: String,
      required: false,
    },
    metaAccountId: {
      type: String,
      required: false,
    },
    whatsappPhoneNumber: {
      type: String,
      required: false,
    },
    pabblySubscriptionId: {
      type: String,
      required: false,
    },
    agents: [
      {
        name: { type: String, required: false },
        twilioNumber: { type: String, required: false },
        vapiAgentId: { type: String, required: false },
        pabblySubscriptionId: { type: String, required: false },
        purchasedAt: { type: Date, default: Date.now },
        safetySettings: {
          disableBooking: { type: Boolean, default: false },
          disableSms: { type: Boolean, default: false },
          humanFallback: { type: Boolean, default: false }
        }
      }
    ],
    planMinutes: {
      type: Number,
      required: false,
    },
    available_credits: {
      type: Number,
      required: false,
    },
    referralCode: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Prevents null conflicts
    },
    referredBy: {
      type: String,
      required: false,
    },
    elevenLabsVoiceId: {
      type: String,
      required: false,
    },
    favoriteVoices: [
      {
        voiceId: { type: String, required: true },
        name: { type: String, required: true },
        preview_url: { type: String, required: true }
      }
    ],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Prevent mongoose from recompiling the model if it already exists
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
