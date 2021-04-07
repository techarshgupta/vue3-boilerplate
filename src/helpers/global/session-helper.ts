/**
 * @author Harsh Gupta
 */

import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

// caches the JWT status
let hasToken = false;

// var to ensure that we run global startup guard once and only once
let init: boolean;

/**
 * Load user session using auth
 * @returns {Boolean}
 */

function loadSession(): boolean {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  return true;
}

/**
 * Handle guest router navigation
 * @param to
 * @param from
 * @param next
 *
 */

function handleGuestPages(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  if (to.path === '/') {
    if (hasToken) {
      next({ name: 'Home', query: from.query });
    } else {
      next({ name: 'Login' });
    }
  } else if (hasToken) {
    next({ name: 'Home', query: from.query });
  } else {
    next();
  }
}

/**
 * Router guard which validates that the user is properly
 * authenticated to acess the given 'to' route
 *
 * @param to
 * @param from
 * @param next
 */

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  if (to.path === '/login' && !hasToken) {
    next();
  } else if (to.meta.guest === true) {
    handleGuestPages(to, from, next);
  } else if (!hasToken) {
    next({ name: 'Login' });
  } else if ((to.name = 'Home' && to.hash && to.fullPath)) {
    to.fullPath = '';
    to.hash = '';
    next('/');
  } else {
    next();
  }
}

/**
 * Global router guard which runs exactly *once*, when the application is first
 * loaded. That is, when processing the very first route. Anything which needs
 * to run at the earliest possible time, before loading any Vue components
 * should happen here.
 *
 * Currently it:
 * - Loads session
 * - Handles the auth check for secure routes
 */

export async function globalStartupGuard(): Promise<boolean | undefined> {
  if (hasToken === false) {
    hasToken = loadSession();
  }

  if (init !== undefined) {
    return init;
  }

  if (!hasToken) {
    init = false;
    return init;
  }
}
