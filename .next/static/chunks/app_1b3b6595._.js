(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_1b3b6595._.js", {

"[project]/app/api/analyze.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "IndianMarketInvestmentService": (()=>IndianMarketInvestmentService),
    "useIndianMarketRecommendations": (()=>useIndianMarketRecommendations)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
// Configuration
const CONFIG = {
    REQUEST_TIMEOUT: 60000,
    API_KEYS: {
        GOOGLE_SEARCH: ("TURBOPACK compile-time value", "AIzaSyAv0eINGFdlMmMdCB-JsgyJ7C1uDHYMNhQ"),
        GOOGLE_CX: ("TURBOPACK compile-time value", "154208f4c3d874439"),
        GROQ: ("TURBOPACK compile-time value", "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")
    },
    DEFAULT_QUERY: "Indian Stock Market Today",
    REFRESH_INTERVAL: 3600000,
    NEWS_SOURCES: [
        "economictimes.indiatimes.com",
        "moneycontrol.com",
        "livemint.com",
        "business-standard.com"
    ],
    MAX_RETRIES: 1,
    RETRY_DELAY: 1000 // 1 second
};
const INDIAN_MARKET_ANALYSIS_PROMPT = `You are a professional investment analyst specializing in Indian financial markets, with expertise in NSE, BSE, and macroeconomic trends in India. Analyze the provided news articles and generate a comprehensive investment recommendation report in JSON format focused on Indian markets. This report should provide actionable investment insights based on current market news, trends, and data.

The report should follow this structure:
{
  "executiveSummary": "HTML-formatted overview highlighting key events in Indian markets and investment opportunities",
  
  "marketSnapshot": {
    "majorIndices": [{"name": "Index name (e.g., NIFTY 50, SENSEX)", "value": 0, "change": 0}],
    "keyRates": [{"name": "Rate name (e.g., RBI Repo Rate)", "value": 0, "change": 0}],
    "commodities": [{"name": "Commodity name", "value": 0, "change": 0}],
    "forex": [{"pair": "Currency pair (e.g., INR/USD)", "value": 0, "change": 0}]
  },
  
  "topStockRecommendations": [
    {
      "ticker": "Stock ticker symbol (NSE/BSE)",
      "companyName": "Company name",
      "recommendationType": "buy|sell|hold",
      "targetPrice": 0,
      "currentPrice": 0,
      "potentialUpside": 0,
      "timeHorizon": "Short-term/Mid-term/Long-term",
      "riskLevel": "low|medium|high",
      "rationale": ["Reasons for recommendation"]
    }
  ],
  
  "sectorOutlooks": [
    {
      "sector": "Sector name (e.g., IT, Pharma, Banking)",
      "sentiment": "bullish|bearish|neutral",
      "impactScore": 0,
      "keyDrivers": ["Key drivers affecting this sector in India"],
      "opportunities": ["Investment opportunities"],
      "risks": ["Potential risks"],
      "recommendedStocks": ["Stock recommendations (NSE/BSE tickers)"]
    }
  ],
  
  "macroTrends": [
    {
      "title": "Trend name",
      "description": "HTML-formatted trend analysis for Indian context",
      "impactAssessment": "Assessment of impact on Indian markets",
      "affectedSectors": ["Sectors in India affected by this trend"],
      "investmentImplications": ["Investment implications for Indian investors"],
      "timelineProjection": "Expected timeline"
    }
  ],
  
  "technicalAnalysis": [
    {
      "indicator": "Technical indicator name",
      "signal": "buy|sell|neutral",
      "strength": 0,
      "description": "What this indicator suggests for Indian markets",
      "applicableStocks": ["Indian stocks this applies to (NSE/BSE tickers)"]
    }
  ],
  
  "investmentStrategies": [
    {
      "strategyName": "Strategy name",
      "suitableFor": ["Indian investor profiles this suits"],
      "allocationRecommendation": {
        "equities": 0,
        "bonds": 0,
        "commodities": 0,
        "cash": 0,
        "alternative": 0
      },
      "topPicks": ["Top investment picks in Indian markets"],
      "implementationSteps": ["How to implement this strategy in Indian markets"]
    }
  ],
  
  "disclaimer": "Investment disclaimer notice appropriate for Indian regulatory context"
}

Guidelines:
- Focus exclusively on Indian markets (NSE, BSE)
- Provide at least 5 specific stock recommendations from NSE/BSE with clear rationales
- Include analysis of at least 4 major market sectors relevant to India
- Identify 3-5 significant macroeconomic trends affecting Indian markets
- Consider RBI policies, government regulations, and India-specific economic factors
- Provide 3 different investment strategies for different Indian investor profiles
- Ensure all recommendations are tied directly to news events and market data
- Include both technical and fundamental analysis in your recommendations
- Discuss potential risks alongside opportunities in the Indian context
- All price targets should be in INR and predictions should be realistic
- Include an appropriate investment disclaimer for Indian markets
- Use sophisticated financial terminology while contextualizing for Indian markets`;
class IndianMarketInvestmentService {
    static lastFetchTime = 0;
    static cachedData = null;
    static isFetchingData = false;
    static pendingPromises = [];
    static async fetchWithTimeout(url, options, retryCount = 0) {
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), CONFIG.REQUEST_TIMEOUT);
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            // If response is not OK and we haven't exceeded retry limit, retry
            if (!response.ok && retryCount < CONFIG.MAX_RETRIES) {
                await new Promise((resolve)=>setTimeout(resolve, CONFIG.RETRY_DELAY));
                return this.fetchWithTimeout(url, options, retryCount + 1);
            }
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            // If error is not an abort error and we haven't exceeded retry limit, retry
            if (!(error instanceof Error && error.name === 'AbortError') && retryCount < CONFIG.MAX_RETRIES) {
                await new Promise((resolve)=>setTimeout(resolve, CONFIG.RETRY_DELAY));
                return this.fetchWithTimeout(url, options, retryCount + 1);
            }
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        }
    }
    static validateConfiguration() {
        const { GOOGLE_SEARCH, GOOGLE_CX, GROQ } = CONFIG.API_KEYS;
        if (!GOOGLE_SEARCH || GOOGLE_SEARCH === '') {
            throw new Error('Google Search API key is missing or empty');
        }
        if (!GOOGLE_CX || GOOGLE_CX === '') {
            throw new Error('Google Custom Search Engine ID is missing or empty');
        }
        if (!GROQ || GROQ === '') {
            throw new Error('Groq API key is missing or empty');
        }
    }
    static async fetchIndianFinancialNews() {
        try {
            // Try various query combinations to increase chances of finding results
            const queries = [
                CONFIG.DEFAULT_QUERY,
                "NIFTY Sensex latest news",
                "Indian stock market updates",
                "NSE BSE market news"
            ];
            // Try each query until we get results
            for (const query of queries){
                try {
                    const articles = await this.executeGoogleSearch(query);
                    if (articles.length > 0) {
                        return articles;
                    }
                } catch (error) {
                    console.warn(`Search with query "${query}" failed:`, error);
                // Continue to next query
                }
            }
            // If we've made it here, we couldn't get results from any query
            throw new Error('Failed to fetch Indian market news after multiple attempts');
        } catch (error) {
            // Create placeholder news articles with direct links to financial sites
            const currentDate = new Date().toISOString();
            // Create articles from direct access to news sites
            const placeholderArticles = [
                {
                    title: 'Unable to fetch latest market news - Using direct sources',
                    summary: 'Please visit the source links for the latest Indian market news and updates.',
                    source: 'Direct Access',
                    url: 'https://economictimes.indiatimes.com/markets',
                    publishedDate: currentDate
                },
                {
                    title: 'NIFTY and SENSEX market updates',
                    summary: 'Visit MoneyControl for the latest NIFTY and SENSEX updates and market analysis.',
                    source: 'MoneyControl',
                    url: 'https://www.moneycontrol.com/stocksmarketsindia/',
                    publishedDate: currentDate
                },
                {
                    title: 'Business news and market analysis',
                    summary: 'Check Livemint for comprehensive business news and market analysis for Indian markets.',
                    source: 'Livemint',
                    url: 'https://www.livemint.com/market',
                    publishedDate: currentDate
                },
                {
                    title: 'Stock market and corporate updates',
                    summary: 'Find the latest corporate news and stock market updates on Business Standard.',
                    source: 'Business Standard',
                    url: 'https://www.business-standard.com/markets',
                    publishedDate: currentDate
                }
            ];
            return placeholderArticles;
        }
    }
    static async executeGoogleSearch(query) {
        // Create search URL for Google Custom Search API
        const searchUrl = new URL('https://www.googleapis.com/customsearch/v1');
        searchUrl.searchParams.append('key', CONFIG.API_KEYS.GOOGLE_SEARCH || '');
        searchUrl.searchParams.append('cx', CONFIG.API_KEYS.GOOGLE_CX || '');
        searchUrl.searchParams.append('q', query);
        searchUrl.searchParams.append('num', '30'); // Request fewer results
        searchUrl.searchParams.append('sort', 'date');
        searchUrl.searchParams.append('dateRestrict', 'd1'); // Just last day
        searchUrl.searchParams.append('gl', 'in'); // Geographic location: India
        searchUrl.searchParams.append('hl', 'en'); // Language: English
        // Join the first two news sources
        searchUrl.searchParams.append('siteSearch', CONFIG.NEWS_SOURCES.slice(0, 2).join(','));
        searchUrl.searchParams.append('siteSearchFilter', 'i');
        const response = await this.fetchWithTimeout(searchUrl.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>null);
            const errorMessage = errorData?.error?.message || response.statusText;
            throw new Error(`Google Search API error (${response.status}): ${errorMessage}`);
        }
        const data = await response.json();
        if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) {
            throw new Error('No search results found');
        }
        return data.items.map((item)=>{
            const siteName = item.pagemap?.metatags?.[0]?.['og:site_name'] || item.displayLink || 'Unknown';
            const publishedDate = item.pagemap?.metatags?.[0]?.['article:published_time'] || new Date().toISOString();
            return {
                title: item.title || 'No title available',
                summary: item.snippet || 'No description available',
                source: siteName,
                url: item.link || '#',
                publishedDate: publishedDate
            };
        });
    }
    static async generateIndianMarketAnalysis(articles) {
        try {
            const response = await this.fetchWithTimeout('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CONFIG.API_KEYS.GROQ}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    model: 'deepseek-r1-distill-qwen-32b',
                    messages: [
                        {
                            role: 'system',
                            content: INDIAN_MARKET_ANALYSIS_PROMPT
                        },
                        {
                            role: 'user',
                            content: `Analyze these news articles about Indian financial markets and provide investment recommendations in json format:\n${JSON.stringify(articles, null, 2)}`
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 4500,
                    response_format: {
                        type: 'json_object'
                    }
                })
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>null);
                const errorMessage = errorData?.error?.message || response.statusText;
                throw new Error(`Groq API error (${response.status}): ${errorMessage}`);
            }
            const data = await response.json();
            const analysisContent = data?.choices?.[0]?.message?.content;
            if (!analysisContent) {
                throw new Error('No analysis content received from Groq API');
            }
            try {
                // Ensure we can parse the JSON correctly
                return JSON.parse(analysisContent);
            } catch (parseError) {
                throw new Error(`Failed to parse Groq API response: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
            }
        } catch (error) {
            // Pass the error up to be handled at the service level
            throw error;
        }
    }
    static async getIndianMarketAnalysis() {
        const currentTime = Date.now();
        // Return cached data if available and not expired
        if (this.cachedData && currentTime - this.lastFetchTime < CONFIG.REFRESH_INTERVAL) {
            return this.cachedData;
        }
        // If a fetch is already in progress, queue this request
        if (this.isFetchingData) {
            return new Promise((resolve, reject)=>{
                this.pendingPromises.push({
                    resolve,
                    reject
                });
            });
        }
        this.isFetchingData = true;
        try {
            // Validate configuration before making any API calls
            this.validateConfiguration();
            // Fetch news articles with our more robust method
            const articles = await this.fetchIndianFinancialNews();
            // Generate analysis
            const analysis = await this.generateIndianMarketAnalysis(articles);
            // Create successful response
            const response = {
                success: true,
                data: {
                    articles,
                    analysis,
                    timestamp: new Date().toISOString()
                }
            };
            // Update cache
            this.cachedData = response;
            this.lastFetchTime = currentTime;
            // Resolve all pending promises
            this.resolveAllPending(response);
            return response;
        } catch (error) {
            // Create error response
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            console.error('Indian market analysis error:', error);
            const errorResponse = {
                success: false,
                error: errorMessage
            };
            // Reject all pending promises
            this.rejectAllPending(new Error(errorMessage));
            return errorResponse;
        } finally{
            this.isFetchingData = false;
        }
    }
    static resolveAllPending(data) {
        for (const pending of this.pendingPromises){
            pending.resolve(data);
        }
        this.pendingPromises = [];
    }
    static rejectAllPending(error) {
        for (const pending of this.pendingPromises){
            pending.reject(error);
        }
        this.pendingPromises = [];
    }
    static clearCache() {
        this.cachedData = null;
        this.lastFetchTime = 0;
    }
}
const useIndianMarketRecommendations = ()=>{
    _s();
    const [investmentData, setInvestmentData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const getIndianMarketAnalysis = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            const result = await IndianMarketInvestmentService.getIndianMarketAnalysis();
            setInvestmentData(result);
            if (!result.success && result.error) {
                setError(result.error);
            }
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setError(errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        } finally{
            setIsLoading(false);
        }
    };
    const refreshAnalysis = ()=>{
        IndianMarketInvestmentService.clearCache();
        return getIndianMarketAnalysis();
    };
    const clearAnalysis = ()=>{
        setInvestmentData(null);
        setError(null);
    };
    return {
        investmentData,
        getIndianMarketAnalysis,
        refreshAnalysis,
        clearAnalysis,
        isLoading,
        error
    };
};
_s(useIndianMarketRecommendations, "eEG4+UXBj4iqWKW0wBshtmpdrw4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/analyze/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$analyze$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/analyze.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const IndianMarketDashboard = ()=>{
    _s();
    const { investmentData, getIndianMarketAnalysis, refreshAnalysis, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$analyze$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIndianMarketRecommendations"])();
    const [selectedTab, setSelectedTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IndianMarketDashboard.useEffect": ()=>{
            getIndianMarketAnalysis();
        }
    }["IndianMarketDashboard.useEffect"], []);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm text-black",
                        children: "Analyzing market data..."
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/analyze/page.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/analyze/page.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-md p-6 bg-white border border-gray-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-4 text-black",
                        children: "Error Loading Data"
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-black mb-4",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: refreshAnalysis,
                        className: "px-4 py-2 bg-black text-white rounded",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/analyze/page.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/analyze/page.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this);
    }
    if (!investmentData?.data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-md p-6 bg-white border border-gray-200 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-4 text-black",
                        children: "No Market Data Available"
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-black mb-4",
                        children: "Market data could not be retrieved."
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: refreshAnalysis,
                        className: "px-4 py-2 bg-black text-white rounded",
                        children: "Load Data"
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/analyze/page.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/analyze/page.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this);
    }
    const { analysis, timestamp } = investmentData.data;
    const formattedDate = new Date(timestamp).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const getChangeColor = (change)=>{
        return change >= 0 ? 'text-green-700' : 'text-red-700';
    };
    const renderTabContent = ()=>{
        switch(selectedTab){
            case 'overview':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-lg border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold mb-4 text-black",
                                    children: "Executive Summary"
                                }, void 0, false, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-black",
                                    dangerouslySetInnerHTML: {
                                        __html: analysis.executiveSummary
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analyze/page.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-lg border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold mb-4 text-black",
                                    children: "Market Snapshot"
                                }, void 0, false, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-medium mb-3 text-black",
                                                    children: "Major Indices"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                    className: "min-w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "pb-2 text-left text-sm font-medium text-black",
                                                                        children: "Index"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/analyze/page.tsx",
                                                                        lineNumber: 90,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "pb-2 text-right text-sm font-medium text-black",
                                                                        children: "Value"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/analyze/page.tsx",
                                                                        lineNumber: 91,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "pb-2 text-right text-sm font-medium text-black",
                                                                        children: "Change"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/analyze/page.tsx",
                                                                        lineNumber: 92,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/analyze/page.tsx",
                                                                lineNumber: 89,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 88,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                            children: analysis.marketSnapshot.majorIndices.map((index, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-2 text-sm text-black",
                                                                            children: index.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/analyze/page.tsx",
                                                                            lineNumber: 98,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-2 text-sm text-black text-right",
                                                                            children: index.value.toLocaleString('en-IN')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/analyze/page.tsx",
                                                                            lineNumber: 99,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: `py-2 text-sm text-right font-medium ${getChangeColor(index.change)}`,
                                                                            children: [
                                                                                index.change >= 0 ? '+' : '',
                                                                                index.change.toFixed(2),
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/analyze/page.tsx",
                                                                            lineNumber: 100,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/app/analyze/page.tsx",
                                                                    lineNumber: 97,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 95,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-medium mb-3 text-black",
                                                    children: "Key Rates"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                    className: "min-w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "pb-2 text-left text-sm font-medium text-black",
                                                                        children: "Rate"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/analyze/page.tsx",
                                                                        lineNumber: 114,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "pb-2 text-right text-sm font-medium text-black",
                                                                        children: "Value"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/analyze/page.tsx",
                                                                        lineNumber: 115,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "pb-2 text-right text-sm font-medium text-black",
                                                                        children: "Change"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/analyze/page.tsx",
                                                                        lineNumber: 116,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/analyze/page.tsx",
                                                                lineNumber: 113,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                            children: analysis.marketSnapshot.keyRates.map((rate, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-2 text-sm text-black",
                                                                            children: rate.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/analyze/page.tsx",
                                                                            lineNumber: 122,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-2 text-sm text-black text-right",
                                                                            children: [
                                                                                rate.value.toFixed(2),
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/analyze/page.tsx",
                                                                            lineNumber: 123,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: `py-2 text-sm text-right font-medium ${getChangeColor(rate.change)}`,
                                                                            children: [
                                                                                rate.change >= 0 ? '+' : '',
                                                                                rate.change.toFixed(2),
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/analyze/page.tsx",
                                                                            lineNumber: 124,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/app/analyze/page.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analyze/page.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/analyze/page.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this);
            case 'recommendations':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-lg border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold mb-4 text-black",
                                    children: "Top Stock Recommendations"
                                }, void 0, false, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "min-w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-2 text-left text-sm font-medium text-black",
                                                        children: "Stock"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-2 text-left text-sm font-medium text-black",
                                                        children: "Rec"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-2 text-right text-sm font-medium text-black",
                                                        children: "Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-2 text-right text-sm font-medium text-black",
                                                        children: "Target"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-2 text-right text-sm font-medium text-black",
                                                        children: "Upside"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-2 text-center text-sm font-medium text-black",
                                                        children: "Risk"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/analyze/page.tsx",
                                                lineNumber: 144,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: analysis.topStockRecommendations.map((stock, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-t border-gray-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-3 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-medium text-black",
                                                                    children: stock.ticker
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/analyze/page.tsx",
                                                                    lineNumber: 157,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-gray-600 text-xs",
                                                                    children: stock.companyName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/analyze/page.tsx",
                                                                    lineNumber: 158,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-3 text-sm",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-2 py-1 text-xs font-medium rounded ${stock.recommendationType === 'buy' ? 'bg-green-50 text-green-700' : stock.recommendationType === 'sell' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-black'}`,
                                                                children: stock.recommendationType.toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/analyze/page.tsx",
                                                                lineNumber: 161,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 160,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-3 text-sm text-black text-right",
                                                            children: [
                                                                "₹",
                                                                stock.currentPrice.toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 169,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-3 text-sm text-black text-right",
                                                            children: [
                                                                "₹",
                                                                stock.targetPrice.toLocaleString('en-IN')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-3 text-sm text-right font-medium",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: getChangeColor(stock.potentialUpside),
                                                                children: [
                                                                    stock.potentialUpside >= 0 ? '+' : '',
                                                                    stock.potentialUpside.toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/analyze/page.tsx",
                                                                lineNumber: 172,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-3 text-sm text-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-2 py-1 text-xs font-medium rounded ${stock.riskLevel === 'high' ? 'bg-red-50 text-red-700' : stock.riskLevel === 'medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`,
                                                                children: stock.riskLevel.toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/analyze/page.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 153,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/analyze/page.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this),
                        analysis.topStockRecommendations.map((stock, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-5 rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-black",
                                                        children: [
                                                            stock.ticker,
                                                            " - ",
                                                            stock.companyName
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 flex items-center text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-2 py-1 text-xs font-medium rounded mr-2 ${stock.recommendationType === 'buy' ? 'bg-green-50 text-green-700' : stock.recommendationType === 'sell' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-black'}`,
                                                                children: stock.recommendationType.toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/analyze/page.tsx",
                                                                lineNumber: 197,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-600",
                                                                children: [
                                                                    stock.timeHorizon,
                                                                    " • ",
                                                                    stock.riskLevel.toUpperCase(),
                                                                    " Risk"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/analyze/page.tsx",
                                                                lineNumber: 204,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/analyze/page.tsx",
                                                lineNumber: 194,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xl font-semibold text-black",
                                                        children: [
                                                            "₹",
                                                            stock.targetPrice.toLocaleString('en-IN')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `text-sm font-medium ${getChangeColor(stock.potentialUpside)}`,
                                                        children: [
                                                            stock.potentialUpside >= 0 ? '+' : '',
                                                            stock.potentialUpside.toFixed(1),
                                                            "% upside"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/analyze/page.tsx",
                                                lineNumber: 207,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/analyze/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-medium text-black mb-2",
                                                children: "Investment Rationale"
                                            }, void 0, false, {
                                                fileName: "[project]/app/analyze/page.tsx",
                                                lineNumber: 216,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "list-disc pl-5 text-sm text-gray-800 space-y-1",
                                                children: stock.rationale.map((point, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: point
                                                    }, j, false, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/analyze/page.tsx",
                                                lineNumber: 217,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/analyze/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/analyze/page.tsx",
                                lineNumber: 192,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/analyze/page.tsx",
                    lineNumber: 139,
                    columnNumber: 11
                }, this);
            case 'sectors':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: analysis.sectorOutlooks.map((sector, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-lg border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-black",
                                                children: sector.sector
                                            }, void 0, false, {
                                                fileName: "[project]/app/analyze/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 flex items-center text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-1 text-xs font-medium rounded mr-2 ${sector.sentiment === 'bullish' ? 'bg-green-50 text-green-700' : sector.sentiment === 'bearish' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-black'}`,
                                                        children: sector.sentiment.toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: [
                                                            "Impact: ",
                                                            sector.impactScore,
                                                            "/10"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/analyze/page.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/analyze/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/analyze/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 233,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-medium text-black mb-2",
                                                    children: "Key Drivers"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "list-disc pl-5 text-sm text-gray-800 space-y-1",
                                                    children: sector.keyDrivers.map((driver, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: driver
                                                        }, j, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 250,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-medium text-black mb-2",
                                                    children: "Opportunities"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "list-disc pl-5 text-sm text-gray-800 space-y-1",
                                                    children: sector.opportunities.map((opportunity, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: opportunity
                                                        }, j, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 263,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 259,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-medium text-black mb-2",
                                            children: "Recommended Stocks"
                                        }, void 0, false, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: sector.recommendedStocks.map((stock, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-1 bg-gray-50 text-black text-xs font-medium rounded",
                                                    children: stock
                                                }, j, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 271,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/analyze/page.tsx",
                            lineNumber: 232,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/analyze/page.tsx",
                    lineNumber: 230,
                    columnNumber: 11
                }, this);
            case 'macro':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: analysis.macroTrends.map((trend, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-lg border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-2 text-black",
                                    children: trend.title
                                }, void 0, false, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 289,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-800 mb-4",
                                    dangerouslySetInnerHTML: {
                                        __html: trend.description
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-medium text-black mb-2",
                                                    children: "Affected Sectors"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: trend.affectedSectors.map((sector, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 bg-gray-50 text-black text-xs font-medium rounded",
                                                            children: sector
                                                        }, j, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 297,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-medium text-black mb-2",
                                                    children: "Investment Implications"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "list-disc pl-5 text-sm text-gray-800 space-y-1",
                                                    children: trend.investmentImplications.map((implication, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: implication
                                                        }, j, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 292,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/analyze/page.tsx",
                            lineNumber: 288,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/analyze/page.tsx",
                    lineNumber: 286,
                    columnNumber: 11
                }, this);
            case 'strategies':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: analysis.investmentStrategies.map((strategy, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-lg border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-2 text-black",
                                    children: strategy.strategyName
                                }, void 0, false, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 323,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-medium text-black mb-2",
                                            children: "Allocation"
                                        }, void 0, false, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: Object.entries(strategy.allocationRecommendation).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3 py-2 bg-gray-50 rounded",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-600",
                                                            children: key
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 330,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-medium text-black",
                                                            children: [
                                                                value,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 331,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, key, true, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 325,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-medium text-black mb-2",
                                                    children: "Top Picks"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: strategy.topPicks.map((pick, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 bg-gray-50 text-black text-xs font-medium rounded",
                                                            children: pick
                                                        }, j, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 338,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-medium text-black mb-2",
                                                    children: "Implementation"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                                    className: "list-decimal pl-5 text-sm text-gray-800 space-y-1",
                                                    children: strategy.implementationSteps.map((step, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: step
                                                        }, j, false, {
                                                            fileName: "[project]/app/analyze/page.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/analyze/page.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/analyze/page.tsx",
                                            lineNumber: 349,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 337,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/analyze/page.tsx",
                            lineNumber: 322,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/analyze/page.tsx",
                    lineNumber: 320,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white border-b border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold text-black",
                                children: "Indian Market Intelligence"
                            }, void 0, false, {
                                fileName: "[project]/app/analyze/page.tsx",
                                lineNumber: 373,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-600",
                                        children: [
                                            "Updated: ",
                                            formattedDate
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/analyze/page.tsx",
                                        lineNumber: 375,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: refreshAnalysis,
                                        className: "px-3 py-1 bg-black text-white text-sm rounded",
                                        disabled: isLoading,
                                        children: isLoading ? 'Refreshing...' : 'Refresh'
                                    }, void 0, false, {
                                        fileName: "[project]/app/analyze/page.tsx",
                                        lineNumber: 376,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/analyze/page.tsx",
                                lineNumber: 374,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/analyze/page.tsx",
                    lineNumber: 371,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/analyze/page.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-6xl mx-auto px-4 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 border-b border-gray-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex space-x-6",
                            children: [
                                'overview',
                                'recommendations',
                                'sectors',
                                'macro',
                                'strategies'
                            ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedTab(tab),
                                    className: `px-1 py-3 text-sm font-medium border-b-2 ${selectedTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`,
                                    children: tab.charAt(0).toUpperCase() + tab.slice(1)
                                }, tab, false, {
                                    fileName: "[project]/app/analyze/page.tsx",
                                    lineNumber: 392,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/analyze/page.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this),
                    renderTabContent(),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 text-xs text-gray-600 p-4 bg-white rounded border border-gray-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            dangerouslySetInnerHTML: {
                                __html: analysis.disclaimer
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/analyze/page.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/analyze/page.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/analyze/page.tsx",
                lineNumber: 388,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/analyze/page.tsx",
        lineNumber: 369,
        columnNumber: 5
    }, this);
};
_s(IndianMarketDashboard, "ibjXoh+dtcXybH3a44lFxsWskc0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$analyze$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIndianMarketRecommendations"]
    ];
});
_c = IndianMarketDashboard;
const __TURBOPACK__default__export__ = IndianMarketDashboard;
var _c;
__turbopack_context__.k.register(_c, "IndianMarketDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_1b3b6595._.js.map