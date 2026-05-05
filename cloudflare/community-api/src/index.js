const SPAM_PATTERNS = [
  /https?:\/\//i,
  /www\./i,
  /(telegram|whatsapp|vx|wechat|line)\s*[:：]?\s*[a-z0-9_@-]+/i,
  /(escort|porn|sex|adult|约炮|外围|裸聊|成人)/i,
  /(casino|bet|博彩|赌球|彩票|棋牌|百家乐)/i,
  /(loan|借贷|刷单|兼职日结|快速赚钱)/i
];

const REQUIRED_CONFIG = ["SESSION_SIGNING_KEY"];
const REQUIRED_TABLES = ["contact_messages"];

const DEFAULT_NOW = {
  weekOf: "2026-02-09",
  focus: {
    zh: "把个人网站升级为可持续的内容操作系统",
    en: "Upgrading this personal site into a sustainable content OS"
  },
  doing: {
    zh: "上线 Now/Lab/Roadmap/Dashboard、增强互动系统、每周更新实验日志",
    en: "Shipping Now/Lab/Roadmap/Dashboard, hardening community features, and publishing weekly experiment logs"
  },
  notDoing: {
    zh: "不追求泛流量和热点内容，不做低价值 SEO 堆量",
    en: "Not chasing generic traffic, trend-chasing content, or low-value SEO volume"
  },
  blockers: {
    zh: "内容生产节奏与系统迭代并行，需要严格优先级管理",
    en: "Balancing publishing cadence with product iteration requires strict prioritization"
  },
  nextActions: {
    zh: "完善 Ask Echo 引用能力、补齐订阅和行为埋点、持续公开路线图",
    en: "Improve Ask Echo citations, complete subscriptions and event tracking, and keep the roadmap public"
  }
};

const DEFAULT_ROADMAP = [
  {
    id: "m1-foundation",
    area: "foundation",
    title: {
      zh: "上线 Now/Lab/Roadmap 并修复互动可靠性",
      en: "Launch Now/Lab/Roadmap and fix interaction reliability"
    },
    status: "in-progress",
    priority: 1,
    targetMonth: "2026-02",
    progress: 60
  },
  {
    id: "m3-ask-v1",
    area: "ai",
    title: {
      zh: "Ask Echo v1（检索 + 引用来源）",
      en: "Ask Echo v1 (retrieval + citations)"
    },
    status: "planned",
    priority: 1,
    targetMonth: "2026-04",
    progress: 0
  },
  {
    id: "m4-dashboard",
    area: "data",
    title: {
      zh: "公开 Dashboard 与数据闭环",
      en: "Public dashboard and data loop"
    },
    status: "planned",
    priority: 2,
    targetMonth: "2026-05",
    progress: 0
  }
];

const DEFAULT_EXPERIMENTS = [
  {
    id: "exp-ai-001",
    pillar: "ai-engineering",
    status: "building",
    title: {
      zh: "为站内内容建立可引用问答索引",
      en: "Build a citation-aware Q&A index for site content"
    },
    hypothesis: {
      zh: "带引用的回答能显著提升可信度和停留时长",
      en: "Citation-backed answers increase trust and session depth"
    },
    method: {
      zh: "对文章/视频/照片描述做关键词匹配并返回来源片段",
      en: "Apply keyword matching across writing/video/photo metadata and return source snippets"
    },
    result: {
      zh: "初版已实现并可在 Ask 页面验证",
      en: "The first version is implemented and testable on the Ask page"
    },
    failureNotes: {
      zh: "长问题仍有召回偏差，需要补充同义词和权重机制",
      en: "Long queries still have recall gaps, requiring synonym and weighting improvements"
    },
    decision: {
      zh: "先保证引用覆盖率，再升级到更复杂的 RAG",
      en: "Prioritize citation coverage before moving to a more complex RAG stack"
    },
    publishedAt: "2026-02-12"
  },
  {
    id: "exp-invest-001",
    pillar: "investment-systems",
    status: "idea",
    title: {
      zh: "构建投资决策日志模板",
      en: "Build an investment decision log template"
    },
    hypothesis: {
      zh: "公开决策过程比公开结论更能建立长期信任",
      en: "Publishing decision processes builds stronger long-term trust than only publishing outcomes"
    },
    method: {
      zh: "每条记录包含假设、约束、仓位变化、复盘结论",
      en: "Each record includes hypothesis, constraints, position changes, and postmortem"
    },
    result: {
      zh: "模板已定义，等待首批数据填充",
      en: "Template defined and waiting for first data entries"
    },
    failureNotes: {
      zh: "暂无",
      en: "N/A"
    },
    decision: {
      zh: "先小规模试运行 4 周",
      en: "Run a 4-week pilot first"
    },
    publishedAt: "2026-02-10"
  },
  {
    id: "exp-creative-001",
    pillar: "creative-tech",
    status: "validated",
    title: {
      zh: "视频与写作双轨联动发布",
      en: "Dual-track publishing: video + writing"
    },
    hypothesis: {
      zh: "多媒体内容可提升跨平台导流效率",
      en: "Multimedia content improves cross-platform traffic conversion"
    },
    method: {
      zh: "同主题短视频 + 长文深度拆解",
      en: "Pair short-form video with long-form breakdowns on the same topic"
    },
    result: {
      zh: "互动率明显优于单一形式发布",
      en: "Engagement outperformed single-format publishing"
    },
    failureNotes: {
      zh: "制作成本高，需要模板化流程",
      en: "Production cost is high and needs templated workflows"
    },
    decision: {
      zh: "保留该模式并标准化脚本",
      en: "Keep this model and standardize production scripts"
    },
    publishedAt: "2026-02-08"
  }
];

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...extraHeaders
    }
  });
}

function withCors(request, headers = {}) {
  const origin = request.headers.get("Origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    ...headers
  };
}

function isSpam(content) {
  const text = (content || "").trim();
  if (!text || text.length > 800) return true;
  return SPAM_PATTERNS.some(pattern => pattern.test(text));
}

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
}

async function parseBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function base64UrlEncode(value) {
  const b64 = btoa(value);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToString(value) {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = `${b64}${"=".repeat((4 - (b64.length % 4 || 4)) % 4)}`;
  return atob(padded);
}

async function hmacSha256Hex(secret, data) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {name: "HMAC", hash: "SHA-256"},
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const bytes = new Uint8Array(signature);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(value) {
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  const bytes = new Uint8Array(digest);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function signSessionToken(payload, secret) {
  const payloadStr = JSON.stringify(payload);
  const encoded = base64UrlEncode(payloadStr);
  const signature = await hmacSha256Hex(secret, encoded);
  return `${encoded}.${signature}`;
}

async function verifySessionToken(token, secret) {
  if (!token || !secret) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = await hmacSha256Hex(secret, encoded);
  if (expected !== signature) return null;
  try {
    const payload = JSON.parse(base64UrlToString(encoded));
    if (!payload?.uid || !payload?.iat) return null;
    return payload;
  } catch {
    return null;
  }
}

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(
    String(email || "")
      .trim()
      .toLowerCase()
  );
}

function getMissingConfig(env) {
  return REQUIRED_CONFIG.filter(key => !String(env[key] || "").trim());
}

async function getMissingTables(db) {
  const missing = [];
  for (const table of REQUIRED_TABLES) {
    const row = await db
      .prepare(
        `
        SELECT name
        FROM sqlite_master
        WHERE type = 'table' AND name = ?1
        LIMIT 1
      `
      )
      .bind(table)
      .first()
      .catch(() => null);
    if (!row?.name) missing.push(table);
  }
  return missing;
}

async function getServiceReadiness(env, db) {
  const [missingConfig, missingTables] = await Promise.all([
    Promise.resolve(getMissingConfig(env)),
    getMissingTables(db)
  ]);
  return {
    ok: missingConfig.length === 0 && missingTables.length === 0,
    missingConfig,
    missingTables
  };
}

function getSessionSigningKey(env) {
  const secret = String(env.SESSION_SIGNING_KEY || "").trim();
  return secret || null;
}

function isMissingTableError(error, tableName) {
  const message = String(error?.message || error || "").toLowerCase();
  const table = String(tableName || "").toLowerCase();
  return (
    message.includes("no such table") && (!table || message.includes(table))
  );
}

function resolveRoleByEmail(email, env) {
  const normalized = String(email || "")
    .trim()
    .toLowerCase();
  if (!normalized) return "member";
  const raw = String(env.ADMIN_EMAILS || "")
    .split(",")
    .map(item => item.trim().toLowerCase())
    .filter(Boolean);
  if (!raw.length) return "member";
  return raw.includes(normalized) ? "admin" : "member";
}

async function ensureUser(db, {userId, displayName, provider, email, role}) {
  if (!userId || !displayName) return false;
  await db
    .prepare(
      `
      INSERT OR IGNORE INTO users (id, provider, display_name)
      VALUES (?1, ?2, ?3)
    `
    )
    .bind(userId, provider || "guest", displayName)
    .run();

  await db
    .prepare(
      `
      UPDATE users
      SET provider = ?2, display_name = ?3, email = ?4, role = ?5
      WHERE id = ?1
    `
    )
    .bind(
      userId,
      provider || "guest",
      displayName,
      email || null,
      role || "member"
    )
    .run()
    .catch(() => null);

  return true;
}

async function verifyGoogleIdToken(idToken, env) {
  const clientId = String(env.GOOGLE_CLIENT_ID || "").trim();
  if (!clientId) {
    return {ok: false, error: "google_client_id_not_configured"};
  }
  if (!idToken) {
    return {ok: false, error: "google_token_required"};
  }

  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(
        idToken
      )}`
    );
    if (!response.ok) {
      return {ok: false, error: "google_token_invalid"};
    }
    const payload = await response.json();
    if (!payload?.sub || !payload?.email) {
      return {ok: false, error: "google_payload_invalid"};
    }
    if (payload.aud !== clientId) {
      return {ok: false, error: "google_audience_mismatch"};
    }
    if (payload.email_verified !== "true" && payload.email_verified !== true) {
      return {ok: false, error: "google_email_not_verified"};
    }
    return {
      ok: true,
      profile: {
        sub: payload.sub,
        email: String(payload.email || "")
          .trim()
          .toLowerCase(),
        name: String(payload.name || payload.email || "").trim(),
        picture: String(payload.picture || "").trim() || null
      }
    };
  } catch {
    return {ok: false, error: "google_verify_failed"};
  }
}

async function tryInsertComment(db, values) {
  const withMetadata = await db
    .prepare(
      `
      INSERT INTO comments (
        id, resource_key, user_id, display_name, content, status, client_ts, source_page, ua_hash
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
    `
    )
    .bind(
      values.id,
      values.resourceKey,
      values.userId,
      values.displayName,
      values.content,
      values.status,
      values.clientTs,
      values.sourcePage,
      values.uaHash
    )
    .run()
    .catch(() => null);

  if (withMetadata) return;

  await db
    .prepare(
      `
      INSERT INTO comments (id, resource_key, user_id, display_name, content, status)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6)
    `
    )
    .bind(
      values.id,
      values.resourceKey,
      values.userId,
      values.displayName,
      values.content,
      values.status
    )
    .run();
}

async function tryInsertFavorite(db, values) {
  const withMetadata = await db
    .prepare(
      `
      INSERT INTO favorites (
        id, user_id, item_key, item_type, item_title, item_url, item_cover_image, client_ts, source_page, ua_hash
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
    `
    )
    .bind(
      values.id,
      values.userId,
      values.itemKey,
      values.itemType,
      values.itemTitle,
      values.itemUrl,
      values.itemCoverImage,
      values.clientTs,
      values.sourcePage,
      values.uaHash
    )
    .run()
    .catch(() => null);

  if (withMetadata) return;

  await db
    .prepare(
      `
      INSERT INTO favorites (
        id, user_id, item_key, item_type, item_title, item_url, item_cover_image
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    `
    )
    .bind(
      values.id,
      values.userId,
      values.itemKey,
      values.itemType,
      values.itemTitle,
      values.itemUrl,
      values.itemCoverImage
    )
    .run();
}

async function recordEvent(db, payload) {
  await db
    .prepare(
      `
      INSERT INTO page_events (
        id, event_type, event_name, page_path, user_id, session_token, payload_json, ua_hash, client_ts
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
    `
    )
    .bind(
      uid("evt"),
      payload.eventType || "custom",
      payload.eventName || "unknown",
      payload.pagePath || "/",
      payload.userId || null,
      payload.sessionToken || null,
      payload.payloadJson || null,
      payload.uaHash || null,
      payload.clientTs || null
    )
    .run()
    .catch(() => null);
}

function normalizeBilingualRow(row, keys) {
  const item = {};
  keys.forEach(key => {
    item[key] = {
      zh: row[`${key}_zh`] || "",
      en: row[`${key}_en`] || ""
    };
  });
  return item;
}

function buildAskAnswer(query, citations, language = "en") {
  if (!citations.length) {
    return {
      answer:
        language === "zh"
          ? "当前没有足够的匹配内容。你可以先查看 Writing、Lab 或 Roadmap 页面。"
          : "There is not enough matching content yet. Please check Writing, Lab, or Roadmap first.",
      confidence: 0,
      fallback: true
    };
  }

  const lead = citations[0];
  const answer =
    language === "zh"
      ? `基于你的网站内容，和“${query}”最相关的是《${
          lead.title
        }》。我还补充了另外 ${Math.max(
          citations.length - 1,
          0
        )} 条来源供你继续深入。`
      : `Based on your site content, the most relevant source for "${query}" is "${
          lead.title
        }". I also included ${Math.max(
          citations.length - 1,
          0
        )} additional references for deeper reading.`;

  const confidence = Math.min(0.95, 0.45 + citations.length * 0.15);
  return {answer, confidence, fallback: false};
}

export default {
  async fetch(request, env) {
    const corsHeaders = withCors(request);
    const url = new URL(request.url);
    const apiPath = url.pathname.startsWith("/api/")
      ? url.pathname.slice(4)
      : url.pathname;

    if (request.method === "OPTIONS") {
      return new Response(null, {status: 204, headers: corsHeaders});
    }

    if (!env.DB) {
      return json(
        {ok: false, error: "missing_d1_binding"},
        500,
        withCors(request)
      );
    }

    const db = env.DB;

    if (url.pathname === "/health" && request.method === "GET") {
      const readiness = await getServiceReadiness(env, db);
      if (!readiness.ok) {
        return json(
          {
            ok: false,
            service: "community-api",
            error: "service_not_ready",
            ...readiness
          },
          503,
          corsHeaders
        );
      }
      return json(
        {ok: true, service: "community-api", ...readiness},
        200,
        corsHeaders
      );
    }

    if (url.pathname === "/auth/session" && request.method === "POST") {
      const body = await parseBody(request);
      if (!body)
        return json({ok: false, error: "invalid_json"}, 400, corsHeaders);

      const userId = (body.userId || "").trim();
      const displayName = (body.displayName || "").trim();
      const provider = (body.provider || "guest").trim();
      const email = String(body.email || "")
        .trim()
        .toLowerCase();

      if (!userId || !displayName) {
        return json({ok: false, error: "missing_fields"}, 400, corsHeaders);
      }
      if (!isValidEmail(email)) {
        return json({ok: false, error: "invalid_email"}, 400, corsHeaders);
      }

      const role = resolveRoleByEmail(email, env);
      await ensureUser(db, {userId, displayName, provider, email, role});
      const secret = getSessionSigningKey(env);
      if (!secret) {
        return json(
          {ok: false, error: "missing_session_signing_key"},
          500,
          corsHeaders
        );
      }
      const nowIso = new Date().toISOString();
      const payload = {uid: userId, provider, email, role, iat: nowIso};
      const token = await signSessionToken(payload, secret);

      await db
        .prepare(
          `
          UPDATE users
          SET session_token = ?2, session_issued_at = ?3
          WHERE id = ?1
        `
        )
        .bind(userId, token, nowIso)
        .run()
        .catch(() => null);

      return json(
        {ok: true, token, issuedAt: nowIso, email, role},
        200,
        corsHeaders
      );
    }

    if (url.pathname === "/auth/google" && request.method === "POST") {
      const body = await parseBody(request);
      if (!body)
        return json({ok: false, error: "invalid_json"}, 400, corsHeaders);

      const verified = await verifyGoogleIdToken(body.idToken, env);
      if (!verified.ok) {
        return json({ok: false, error: verified.error}, 401, corsHeaders);
      }

      const profile = verified.profile;
      const userId = `google:${profile.sub}`;
      const role = resolveRoleByEmail(profile.email, env);
      const provider = "google";
      const nowIso = new Date().toISOString();

      await ensureUser(db, {
        userId,
        displayName: profile.name || profile.email,
        provider,
        email: profile.email,
        role
      });

      const secret = getSessionSigningKey(env);
      if (!secret) {
        return json(
          {ok: false, error: "missing_session_signing_key"},
          500,
          corsHeaders
        );
      }
      const token = await signSessionToken(
        {uid: userId, provider, email: profile.email, role, iat: nowIso},
        secret
      );

      await db
        .prepare(
          `
          UPDATE users
          SET session_token = ?2, session_issued_at = ?3
          WHERE id = ?1
        `
        )
        .bind(userId, token, nowIso)
        .run()
        .catch(() => null);

      return json(
        {
          ok: true,
          token,
          issuedAt: nowIso,
          role,
          email: profile.email,
          user: {
            id: userId,
            provider,
            displayName: profile.name || profile.email,
            email: profile.email,
            picture: profile.picture
          }
        },
        200,
        corsHeaders
      );
    }

    if (
      (apiPath === "/now/latest" || url.pathname === "/now/latest") &&
      request.method === "GET"
    ) {
      const latest = await db
        .prepare(
          `
          SELECT week_of, focus_zh, focus_en, doing_zh, doing_en, not_doing_zh, not_doing_en,
                 blockers_zh, blockers_en, next_actions_zh, next_actions_en
          FROM now_snapshots
          ORDER BY week_of DESC, created_at DESC
          LIMIT 1
        `
        )
        .first()
        .catch(() => null);

      if (!latest) {
        return json(
          {ok: true, now: DEFAULT_NOW, source: "default"},
          200,
          corsHeaders
        );
      }

      return json(
        {
          ok: true,
          now: {
            weekOf: latest.week_of,
            focus: {zh: latest.focus_zh, en: latest.focus_en},
            doing: {zh: latest.doing_zh, en: latest.doing_en},
            notDoing: {zh: latest.not_doing_zh, en: latest.not_doing_en},
            blockers: {zh: latest.blockers_zh, en: latest.blockers_en},
            nextActions: {
              zh: latest.next_actions_zh,
              en: latest.next_actions_en
            }
          },
          source: "db"
        },
        200,
        corsHeaders
      );
    }

    if (
      (apiPath === "/roadmap" || url.pathname === "/roadmap") &&
      request.method === "GET"
    ) {
      const {results} = (await db
        .prepare(
          `
          SELECT id, area, title_zh, title_en, status, priority, target_month, progress, sort_order
          FROM roadmap_items
          ORDER BY sort_order ASC, created_at DESC
        `
        )
        .all()
        .catch(() => ({results: []}))) || {results: []};

      if (!results?.length) {
        return json(
          {ok: true, roadmap: DEFAULT_ROADMAP, source: "default"},
          200,
          corsHeaders
        );
      }

      const roadmap = results.map(item => ({
        id: item.id,
        area: item.area,
        title: {
          zh: item.title_zh,
          en: item.title_en
        },
        status: item.status,
        priority: item.priority,
        targetMonth: item.target_month,
        progress: item.progress
      }));

      return json({ok: true, roadmap, source: "db"}, 200, corsHeaders);
    }

    if (
      (apiPath === "/experiments" || url.pathname === "/experiments") &&
      request.method === "GET"
    ) {
      const pillar = (url.searchParams.get("pillar") || "").trim();
      const status = (url.searchParams.get("status") || "").trim();
      const limit = Math.min(Number(url.searchParams.get("limit") || 20), 100);

      const filters = [];
      const bind = [];
      if (pillar) {
        filters.push(`pillar = ?${bind.length + 1}`);
        bind.push(pillar);
      }
      if (status) {
        filters.push(`status = ?${bind.length + 1}`);
        bind.push(status);
      }

      const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
      const sql = `
        SELECT id, pillar, status, title_zh, title_en, hypothesis_zh, hypothesis_en,
               method_zh, method_en, result_zh, result_en, failure_notes_zh, failure_notes_en,
               decision_zh, decision_en, published_at
        FROM experiments
        ${where}
        ORDER BY published_at DESC, created_at DESC
        LIMIT ${Number.isFinite(limit) && limit > 0 ? limit : 20}
      `;

      const {results} = (await db
        .prepare(sql)
        .bind(...bind)
        .all()
        .catch(() => ({results: []}))) || {results: []};

      if (!results?.length) {
        let fallback = [...DEFAULT_EXPERIMENTS];
        if (pillar) fallback = fallback.filter(item => item.pillar === pillar);
        if (status) fallback = fallback.filter(item => item.status === status);
        return json(
          {ok: true, experiments: fallback.slice(0, limit), source: "default"},
          200,
          corsHeaders
        );
      }

      const experiments = results.map(item => ({
        id: item.id,
        pillar: item.pillar,
        status: item.status,
        title: {zh: item.title_zh, en: item.title_en},
        hypothesis: {zh: item.hypothesis_zh, en: item.hypothesis_en},
        method: {zh: item.method_zh, en: item.method_en},
        result: {zh: item.result_zh, en: item.result_en},
        failureNotes: {zh: item.failure_notes_zh, en: item.failure_notes_en},
        decision: {zh: item.decision_zh, en: item.decision_en},
        publishedAt: item.published_at
      }));

      return json({ok: true, experiments, source: "db"}, 200, corsHeaders);
    }

    if (
      (apiPath === "/dashboard/public" ||
        url.pathname === "/dashboard/public") &&
      request.method === "GET"
    ) {
      const countQuery = async sql => {
        const row = await db
          .prepare(sql)
          .first()
          .catch(() => null);
        return Number(row?.count || 0);
      };

      const [comments, favorites, subscribers, events, asks] =
        await Promise.all([
          countQuery(
            `SELECT COUNT(*) AS count FROM comments WHERE status = 'ok'`
          ),
          countQuery(`SELECT COUNT(*) AS count FROM favorites`),
          countQuery(`SELECT COUNT(*) AS count FROM subscribers`),
          countQuery(`SELECT COUNT(*) AS count FROM page_events`),
          countQuery(`SELECT COUNT(*) AS count FROM ask_queries`)
        ]);

      return json(
        {
          ok: true,
          dashboard: {
            totals: {
              comments,
              favorites,
              subscribers,
              events,
              askQueries: asks
            },
            updatedAt: new Date().toISOString()
          }
        },
        200,
        corsHeaders
      );
    }

    if (
      (apiPath === "/subscribers" || url.pathname === "/subscribers") &&
      request.method === "POST"
    ) {
      const body = await parseBody(request);
      if (!body)
        return json({ok: false, error: "invalid_json"}, 400, corsHeaders);

      const email = String(body.email || "")
        .trim()
        .toLowerCase();
      const locale = String(body.locale || "en").trim() || "en";
      const source = String(body.source || "site").trim() || "site";

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return json({ok: false, error: "invalid_email"}, 400, corsHeaders);
      }

      const existing = await db
        .prepare(`SELECT id FROM subscribers WHERE email = ?1 LIMIT 1`)
        .bind(email)
        .first();
      if (existing) {
        return json({ok: true, exists: true}, 200, corsHeaders);
      }

      await db
        .prepare(
          `
          INSERT INTO subscribers (id, email, locale, source)
          VALUES (?1, ?2, ?3, ?4)
        `
        )
        .bind(uid("sub"), email, locale, source)
        .run();

      return json({ok: true, exists: false}, 201, corsHeaders);
    }

    if (
      (apiPath === "/contact-messages" ||
        url.pathname === "/contact-messages") &&
      request.method === "POST"
    ) {
      const body = await parseBody(request);
      if (!body)
        return json({ok: false, error: "invalid_json"}, 400, corsHeaders);

      const name = String(body.name || "").trim();
      const email = String(body.email || "")
        .trim()
        .toLowerCase();
      const topic = String(body.topic || "").trim();
      const message = String(body.message || "").trim();
      const locale = String(body.locale || "en").trim() || "en";
      const source =
        String(body.source || "contact-page").trim() || "contact-page";
      const pagePath = String(body.pagePath || "").trim() || null;
      const clientTs = String(body.clientTs || "").trim() || null;

      if (!name || !topic || !message) {
        return json({ok: false, error: "missing_fields"}, 400, corsHeaders);
      }
      if (!isValidEmail(email)) {
        return json({ok: false, error: "invalid_email"}, 400, corsHeaders);
      }
      if (
        name.length > 120 ||
        email.length > 160 ||
        topic.length > 160 ||
        message.length > 1600
      ) {
        return json({ok: false, error: "field_too_long"}, 400, corsHeaders);
      }
      if (SPAM_PATTERNS.some(pattern => pattern.test(`${topic}\n${message}`))) {
        return json({ok: false, error: "blocked_by_filter"}, 200, corsHeaders);
      }

      const id = uid("msg");
      try {
        await db
          .prepare(
            `
            INSERT INTO contact_messages (
              id, name, email, topic, message, locale, source, page_path, client_ts
            )
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
          `
          )
          .bind(
            id,
            name,
            email,
            topic,
            message,
            locale,
            source,
            pagePath,
            clientTs
          )
          .run();
      } catch (error) {
        if (isMissingTableError(error, "contact_messages")) {
          return json(
            {
              ok: false,
              error: "contact_messages_schema_not_ready",
              missingTables: ["contact_messages"]
            },
            503,
            corsHeaders
          );
        }
        throw error;
      }

      return json({ok: true, id}, 201, corsHeaders);
    }

    if (
      (apiPath === "/events" || url.pathname === "/events") &&
      request.method === "POST"
    ) {
      const body = await parseBody(request);
      if (!body)
        return json({ok: false, error: "invalid_json"}, 400, corsHeaders);

      const uaRaw = request.headers.get("user-agent") || "";
      const uaHash = body.uaHash || (uaRaw ? await sha256Hex(uaRaw) : null);
      await recordEvent(db, {
        eventType: body.eventType,
        eventName: body.eventName,
        pagePath: body.pagePath,
        userId: body.userId,
        sessionToken: body.sessionToken,
        payloadJson: body.payload ? JSON.stringify(body.payload) : null,
        uaHash,
        clientTs: body.clientTs || null
      });

      return json({ok: true}, 201, corsHeaders);
    }

    if (
      (apiPath === "/ask/query" || url.pathname === "/ask/query") &&
      request.method === "POST"
    ) {
      const body = await parseBody(request);
      if (!body)
        return json({ok: false, error: "invalid_json"}, 400, corsHeaders);

      const query = (body.query || "").trim();
      const language = (body.language || "en").trim() || "en";
      const userId = (body.userId || "").trim() || null;
      const candidates = Array.isArray(body.candidates) ? body.candidates : [];

      if (!query)
        return json({ok: false, error: "query_required"}, 400, corsHeaders);

      const start = Date.now();
      const citations = candidates
        .slice(0, 3)
        .map(item => ({
          title: String(item.title || "").trim(),
          url: String(item.url || "").trim(),
          snippet: String(item.snippet || "").trim()
        }))
        .filter(item => item.title && item.url);

      const generated = buildAskAnswer(query, citations, language);
      const latencyMs = Date.now() - start;

      await db
        .prepare(
          `
          INSERT INTO ask_queries (
            id, query, answer, top_citations_json, confidence, fallback, latency_ms, status, user_id, locale
          )
          VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
        `
        )
        .bind(
          uid("ask"),
          query,
          generated.answer,
          JSON.stringify(citations),
          generated.confidence,
          generated.fallback ? 1 : 0,
          latencyMs,
          "ok",
          userId,
          language
        )
        .run()
        .catch(() => null);

      return json(
        {
          ok: true,
          answer: generated.answer,
          citations,
          confidence: generated.confidence,
          fallback: generated.fallback
        },
        200,
        corsHeaders
      );
    }

    if (url.pathname === "/comments" && request.method === "GET") {
      const resourceKey = (url.searchParams.get("resourceKey") || "").trim();
      if (!resourceKey) {
        return json(
          {ok: false, error: "resource_key_required"},
          400,
          corsHeaders
        );
      }
      const {results} = await db
        .prepare(
          `
          SELECT id, resource_key, user_id, display_name, content, status, created_at
          FROM comments
          WHERE resource_key = ?1 AND status = 'ok'
          ORDER BY created_at DESC
          LIMIT 100
        `
        )
        .bind(resourceKey)
        .all();
      return json({ok: true, comments: results || []}, 200, corsHeaders);
    }

    if (url.pathname === "/comments" && request.method === "POST") {
      const body = await parseBody(request);
      if (!body)
        return json({ok: false, error: "invalid_json"}, 400, corsHeaders);

      const resourceKey = (body.resourceKey || "").trim();
      const content = (body.content || "").trim();
      const displayName = (body.displayName || "").trim();
      const userId = (body.userId || "").trim();
      const provider = (body.provider || "guest").trim();
      const clientTs = (body.client_ts || body.clientTs || "").trim() || null;
      const sourcePage =
        (body.source_page || body.sourcePage || "").trim() || null;
      const uaRaw = request.headers.get("user-agent") || "";
      const uaHash =
        (body.ua_hash || body.uaHash || "").trim() ||
        (uaRaw ? await sha256Hex(uaRaw) : null);

      if (!resourceKey || !content || !displayName || !userId) {
        return json({ok: false, error: "missing_fields"}, 400, corsHeaders);
      }

      await ensureUser(db, {userId, displayName, provider});
      const status = isSpam(content) ? "blocked" : "ok";
      const id = uid("cmt");

      await tryInsertComment(db, {
        id,
        resourceKey,
        userId,
        displayName,
        content,
        status,
        clientTs,
        sourcePage,
        uaHash
      });

      await recordEvent(db, {
        eventType: "engagement",
        eventName: "comment_submit",
        pagePath: sourcePage || resourceKey,
        userId,
        payloadJson: JSON.stringify({resourceKey, status}),
        uaHash,
        clientTs
      });

      if (status === "blocked") {
        return json({ok: false, error: "blocked_by_filter"}, 200, corsHeaders);
      }
      return json({ok: true, id}, 201, corsHeaders);
    }

    if (url.pathname === "/favorites" && request.method === "GET") {
      const userId = (url.searchParams.get("userId") || "").trim();
      if (!userId)
        return json({ok: false, error: "user_id_required"}, 400, corsHeaders);

      const {results} = await db
        .prepare(
          `
          SELECT item_key, item_type, item_title, item_url, item_cover_image, created_at
          FROM favorites
          WHERE user_id = ?1
          ORDER BY created_at DESC
        `
        )
        .bind(userId)
        .all();
      return json({ok: true, favorites: results || []}, 200, corsHeaders);
    }

    if (url.pathname === "/favorites/toggle" && request.method === "POST") {
      const body = await parseBody(request);
      if (!body)
        return json({ok: false, error: "invalid_json"}, 400, corsHeaders);

      const userId = (body.userId || "").trim();
      const displayName = (body.displayName || "").trim();
      const provider = (body.provider || "guest").trim();
      const clientTs = (body.client_ts || body.clientTs || "").trim() || null;
      const sourcePage =
        (body.source_page || body.sourcePage || "").trim() || null;
      const uaRaw = request.headers.get("user-agent") || "";
      const uaHash =
        (body.ua_hash || body.uaHash || "").trim() ||
        (uaRaw ? await sha256Hex(uaRaw) : null);

      const item = body.item || {};
      const itemKey = (item.key || "").trim();
      const itemType = (item.type || "content").trim();
      const itemTitle = (item.title || "").trim();
      const itemUrl = (item.url || "").trim();
      const itemCoverImage = (item.coverImage || "").trim();

      if (!userId || !displayName || !itemKey || !itemTitle || !itemUrl) {
        return json({ok: false, error: "missing_fields"}, 400, corsHeaders);
      }

      await ensureUser(db, {userId, displayName, provider});

      const existing = await db
        .prepare(
          `
          SELECT id FROM favorites
          WHERE user_id = ?1 AND item_key = ?2
          LIMIT 1
        `
        )
        .bind(userId, itemKey)
        .first();

      if (existing) {
        await db
          .prepare(`DELETE FROM favorites WHERE id = ?1`)
          .bind(existing.id)
          .run();

        await recordEvent(db, {
          eventType: "engagement",
          eventName: "favorite_remove",
          pagePath: sourcePage || itemUrl,
          userId,
          payloadJson: JSON.stringify({itemKey}),
          uaHash,
          clientTs
        });

        return json({ok: true, saved: false}, 200, corsHeaders);
      }

      await tryInsertFavorite(db, {
        id: uid("fav"),
        userId,
        itemKey,
        itemType,
        itemTitle,
        itemUrl,
        itemCoverImage: itemCoverImage || null,
        clientTs,
        sourcePage,
        uaHash
      });

      await recordEvent(db, {
        eventType: "engagement",
        eventName: "favorite_add",
        pagePath: sourcePage || itemUrl,
        userId,
        payloadJson: JSON.stringify({itemKey, itemType}),
        uaHash,
        clientTs
      });

      return json({ok: true, saved: true}, 200, corsHeaders);
    }

    return json({ok: false, error: "not_found"}, 404, corsHeaders);
  }
};
