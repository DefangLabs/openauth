export function getTagColor(tag: string) {
  const colors: Record<string, { bgColor: string; textColor: string }> = {
    default: {
      bgColor: "#333",
      textColor: "#fff",
    },
    django: {
      bgColor: "#092e20",
      textColor: "#fff",
    },
    sqlite: {
      bgColor: "#003b57",
      textColor: "#fff",
    },
    postgres: {
      bgColor: "#336791",
      textColor: "#fff",
    },
    flask: {
      bgColor: "#000000",
      textColor: "#fff",
    },
    python: {
      bgColor: "#3572A5",
      textColor: "#fff",
    },
    go: {
      bgColor: "#00ADD8",
      textColor: "#fff",
    },
    golang: {
      bgColor: "#00ADD8",
      textColor: "#fff",
    },
    http: {
      bgColor: "#0056D2",
      textColor: "#fff",
    },
    form: {
      bgColor: "#2E8B57",
      textColor: "#fff",
    },
    mongodb: {
      bgColor: "#47A248",
      textColor: "#fff",
    },
    atlas: {
      bgColor: "#243B53",
      textColor: "#fff",
    },
    "task manager": {
      bgColor: "#FF8C00",
      textColor: "#fff",
    },
    openai: {
      bgColor: "#412991",
      textColor: "#fff",
    },
    chatgpt: {
      bgColor: "#10A37F",
      textColor: "#fff",
    },
    "fiscal data": {
      bgColor: "#006699",
      textColor: "#fff",
    },
    api: {
      bgColor: "#0E3A60",
      textColor: "#fff",
    },
    rest: {
      bgColor: "#FF5733",
      textColor: "#fff",
    },
    s3: {
      bgColor: "#569A31",
      textColor: "#fff",
    },
    aws: {
      bgColor: "#FF9900",
      textColor: "#fff",
    },
    slack: {
      bgColor: "#4A154B",
      textColor: "#fff",
    },
    bot: {
      bgColor: "#E74C3C",
      textColor: "#fff",
    },
    hasura: {
      bgColor: "#1EB4D4",
      textColor: "#fff",
    },
    graphql: {
      bgColor: "#E10098",
      textColor: "#fff",
    },
    database: {
      bgColor: "#F29111",
      textColor: "#fff",
    },
    huginn: {
      bgColor: "#5A5A5A",
      textColor: "#fff",
    },
    agents: {
      bgColor: "#1A237E",
      textColor: "#fff",
    },
    automation: {
      bgColor: "#E65100",
      textColor: "#fff",
    },
    imgproxy: {
      bgColor: "#00BCD4",
      textColor: "#fff",
    },
    images: {
      bgColor: "#2196F3",
      textColor: "#fff",
    },
    server: {
      bgColor: "#FF5722",
      textColor: "#fff",
    },
    metabase: {
      bgColor: "#509EE3",
      textColor: "#fff",
    },
    analytics: {
      bgColor: "#1D3557",
      textColor: "#fff",
    },
    "next.js": {
      bgColor: "#000000",
      textColor: "#fff",
    },
    react: {
      bgColor: "#61DAFB",
      textColor: "#333",
    },
    redis: {
      bgColor: "#DC382D",
      textColor: "#fff",
    },
    docker: {
      bgColor: "#2496ED",
      textColor: "#fff",
    },
    nextjs: {
      bgColor: "#000000",
      textColor: "#fff",
    },
    blog: {
      bgColor: "#F57C00",
      textColor: "#fff",
    },
    nodejs: {
      bgColor: "#43853d",
      textColor: "#fff",
    },
    mdx: {
      bgColor: "#1A73E8",
      textColor: "#fff",
    },
    boilerplate: {
      bgColor: "#FFC107",
      textColor: "#333",
    },
    website: {
      bgColor: "#03A9F4",
      textColor: "#fff",
    },
    documentation: {
      bgColor: "#FFEB3B",
      textColor: "#333",
    },
    nextra: {
      bgColor: "#3B82F6",
      textColor: "#fff",
    },
    knowledgebase: {
      bgColor: "#673AB7",
      textColor: "#fff",
    },
    "github actions": {
      bgColor: "#2088FF",
      textColor: "#fff",
    },
    chat: {
      bgColor: "#3B5998",
      textColor: "#fff",
    },
    "socket.io": {
      bgColor: "#010101",
      textColor: "#fff",
    },
    express: {
      bgColor: "#000000",
      textColor: "#fff",
    },
    request: {
      bgColor: "#3498DB",
      textColor: "#fff",
    },
    inspector: {
      bgColor: "#8E44AD",
      textColor: "#fff",
    },
    "node.js": {
      bgColor: "#43853d",
      textColor: "#fff",
    },
    phoenix: {
      bgColor: "#E44D26",
      textColor: "#fff",
    },
    elixir: {
      bgColor: "#6e4a7e",
      textColor: "#fff",
    },
    pulumi: {
      bgColor: "#6A0DAD",
      textColor: "#fff",
    },
    music: {
      bgColor: "#1DB954",
      textColor: "#fff",
    },
    recommendation: {
      bgColor: "#4CAF50",
      textColor: "#fff",
    },
    "collaborative filtering": {
      bgColor: "#2ECC71",
      textColor: "#fff",
    },
    "implicit library": {
      bgColor: "#9B59B6",
      textColor: "#fff",
    },
    ai: {
      bgColor: "#2C3E50",
      textColor: "#fff",
    },
    ruby: {
      bgColor: "#CC342D",
      textColor: "#fff",
    },
    rails: {
      bgColor: "#CC0000",
      textColor: "#fff",
    },
    "full stack": {
      bgColor: "#2A9D8F",
      textColor: "#fff",
    },
    remix: {
      bgColor: "#121212",
      textColor: "#fff",
    },
    prisma: {
      bgColor: "#0C344B",
      textColor: "#fff",
    },
    aiven: {
      bgColor: "#DB5461",
      textColor: "#fff",
    },
    svelte: {
      bgColor: "#FF3E00",
      textColor: "#fff",
    },
    mysql: {
      bgColor: "#00758F",
      textColor: "#fff",
    },
    "full-stack": {
      bgColor: "#2A9D8F",
      textColor: "#fff",
    },
    sveltekit: {
      bgColor: "#FF3E00",
      textColor: "#fff",
    },
    mistral: {
      bgColor: "#026670",
      textColor: "#fff",
    },
    vllm: {
      bgColor: "#FF6F61",
      textColor: "#fff",
    },
    sql: {
      bgColor: "#F29111",
      textColor: "#fff",
    },
    javascript: {
      bgColor: "#f1e05a",
      textColor: "#333",
    },
    typescript: {
      bgColor: "#2b7489",
      textColor: "#fff",
    },
  };

  if (colors[tag.toLowerCase()]) {
    return {
      bgColor: colors[tag.toLowerCase()].bgColor,
      textColor: colors[tag.toLowerCase()].textColor,
      text: tag,
    };
  }
  return {
    bgColor: colors.default.bgColor,
    textColor: colors.default.textColor,
    text: tag,
  };
}
