export interface ServiceNode {
  id: string;
  name: string;
  instances: number;
  memory: string;
  status: 'online' | 'degraded' | 'offline';
  notes: string;
}

export const homelabData = {
  hardware: "Laptop, 7.5GB RAM, 232GB SSD, Ubuntu (fazley-vps)",
  network: "SSH (192.168.0.222), Tailscale, Cloudflared",
  totalContainers: 54,
  memoryUsed: "3.8GB / 7.5GB",
  services: [
    {
      id: "mysql-shared",
      name: "mysqld (Shared)",
      instances: 1,
      memory: "386MB",
      status: "online",
      notes: "Consolidated from 5 DBs, saving ~1.1GB RAM"
    },
    {
      id: "oblok-stack",
      name: "oblok Stack",
      instances: 5,
      memory: "~300MB",
      status: "online",
      notes: "app, worker, scheduler, postgres, redis"
    },
    {
      id: "ephemeral-runner",
      name: "Runner Launcher",
      instances: 1,
      memory: "~35MB",
      status: "online",
      notes: "Spawns ephemeral runners on demand via webhook"
    },
    {
      id: "llama-server",
      name: "Qwen LLM",
      instances: 1,
      memory: "427MB",
      status: "online",
      notes: "SignalStack AI — stopped when idle"
    },
    {
      id: "grafana-stack",
      name: "Grafana + Loki + Prometheus",
      instances: 4,
      memory: "~150MB",
      status: "online",
      notes: "Full monitoring and log aggregation"
    }
  ] as ServiceNode[]
};
