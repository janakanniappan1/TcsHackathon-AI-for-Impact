import React from 'react';
import { CloudRain, Route, Sparkles, Server, CheckCircle2, Info } from 'lucide-react';
import { Card } from '../common/Card';
import { serviceConfig } from '../../services';

export const TelemetryGatewayStatus: React.FC = () => {
  const gateways = [
    {
      name: 'Open-Meteo Weather API',
      description: 'Precipitation, wind gusts & flood hydro-telemetry',
      endpoint: serviceConfig.openMeteo.baseUrl,
      isConfigured: serviceConfig.openMeteo.isConfigured,
      icon: CloudRain,
      type: 'Open Telemetry (No Key Required)',
    },
    {
      name: 'OSRM Disaster Routing Engine',
      description: 'Road graph topology & distance-matrix calculator',
      endpoint: serviceConfig.osrm.baseUrl,
      isConfigured: serviceConfig.osrm.isConfigured,
      icon: Route,
      type: 'Spatial Network Gateway',
    },
    {
      name: 'Google Gemini Reasoning API',
      description: 'Evidence extraction, rumor cross-validation & CoT cards',
      endpoint: serviceConfig.gemini.model,
      isConfigured: serviceConfig.gemini.isConfigured,
      icon: Sparkles,
      type: 'Agentic LLM Engine',
    },
    {
      name: 'FastAPI Mathematical Backend',
      description: 'PuLP / SciPy MILP optimizer & NetworkX bridge',
      endpoint: serviceConfig.backend.baseUrl,
      isConfigured: serviceConfig.backend.isConfigured,
      icon: Server,
      type: 'Optimization Core',
    },
  ];

  return (
    <Card
      title="External Telemetry & API Ingestion Gateway"
      subtitle="Modular service connectors with secure, isolated environment integration"
    >
      <div className="space-y-3">
        {gateways.map((gw) => (
          <div
            key={gw.name}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-sentinel-800 bg-sentinel-950/70 gap-3"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-sentinel-900 border border-sentinel-700 text-teal-400 mt-0.5 sm:mt-0">
                <gw.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-semibold text-white">{gw.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400">({gw.type})</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{gw.description}</p>
                <p className="text-[10px] font-mono text-slate-500 mt-1 truncate max-w-sm">
                  Endpoint: {gw.endpoint}
                </p>
              </div>
            </div>

            <div className="flex items-center self-end sm:self-center">
              {gw.isConfigured ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-[11px] font-mono text-teal-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
                  <span>CONFIGURED</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-400">
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                  <span>ENV KEY PENDING</span>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="rounded-lg bg-sentinel-900/50 border border-sentinel-800/80 p-3 text-xs text-slate-400 flex items-start gap-2.5 mt-2">
          <Info className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
          <span>
            <strong>Security Guardrail:</strong> API keys are read strictly from protected environment variables (`VITE_GEMINI_API_KEY`) and never committed or exposed on the client.
          </span>
        </div>
      </div>
    </Card>
  );
};

