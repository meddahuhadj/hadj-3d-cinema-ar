import React from 'react';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="bg-slate-900/60 border-t border-b border-slate-800 py-7 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-950 text-[#3f9d6d] border border-[#3f9d6d]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-lg text-white">Traitement Éphémère & Respect de la Vie Privée</h4>
              <p className="text-xs text-slate-400">
                Vos photos sont traitées en mémoire vive et supprimées à la fermeture de l'onglet. Aucune conservation en base de données.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 font-mono-code">
            <span className="flex items-center gap-1 text-[#3f9d6d]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Zéro persistance serveur
            </span>
            <span className="flex items-center gap-1 text-gold-300">
              <Lock className="w-3.5 h-3.5" /> Transfert chiffré TLS 1.3 / HTTPS
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
