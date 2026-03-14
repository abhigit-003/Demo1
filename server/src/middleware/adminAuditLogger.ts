import { Request, Response, NextFunction } from 'express';

/**
 * Admin Audit Logger Middleware
 * Logs every request to /api/admin/* routes.
 * This runs BEFORE authentication, capturing both successful and blocked attempts.
 * Covers Requirements:
 *  - Log successful admin logins
 *  - Log failed/unauthorized admin access attempts
 *  - Log all admin route access with IP, user, route, and result
 */
export const adminAuditLogger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const method = req.method;
    const route = req.originalUrl;

    // Hook into the response to capture the final status code after auth
    const originalSend = res.json.bind(res);
    res.json = (body: unknown) => {
        const statusCode = res.statusCode;
        const userEmail = (req as Request & { user?: { email: string; role: string } }).user?.email || 'unauthenticated';
        const userRole = (req as Request & { user?: { email: string; role: string } }).user?.role || 'none';

        if (statusCode === 401 || statusCode === 403) {
            console.warn(
                `[ADMIN AUDIT ⛔] ${timestamp} | IP: ${ip} | User: ${userEmail} (${userRole}) | ${method} ${route} | Status: ${statusCode} DENIED`
            );
        } else if (statusCode >= 200 && statusCode < 300) {
            console.info(
                `[ADMIN AUDIT ✅] ${timestamp} | IP: ${ip} | User: ${userEmail} (${userRole}) | ${method} ${route} | Status: ${statusCode} OK`
            );
        } else {
            console.error(
                `[ADMIN AUDIT ⚠️] ${timestamp} | IP: ${ip} | User: ${userEmail} (${userRole}) | ${method} ${route} | Status: ${statusCode} ERROR`
            );
        }

        return originalSend(body);
    };

    next();
};
