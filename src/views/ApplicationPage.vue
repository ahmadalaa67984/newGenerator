<template>
  <div class="min-h-screen">
    <!-- Modern Navigation -->
    <nav class="glass-card border-none shadow-medium">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center">
                <div
                  class="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-colored mr-3"
                >
                  <LightningIcon iconClass="h-6 w-6 text-white" />
                </div>
                <h1
                  class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
                >
                  Dashboard
                </h1>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-6">
            <!-- User Info -->
            <div v-if="authStore.user" class="flex items-center space-x-3">
              <div class="text-right">
                <p class="text-sm font-semibold text-neutral-700">
                  {{ authStore.user.name }}
                </p>
                <p class="text-xs text-neutral-500">
                  {{ authStore.user.email }}
                </p>
              </div>
              <div
                class="h-10 w-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-medium"
              >
                <UserIcon iconClass="h-5 w-5 text-white" />
              </div>
            </div>

            <!-- Logout Button -->
            <button
              @click="handleLogout"
              :disabled="authStore.loading"
              class="flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl border border-red-200 hover:border-red-300 shadow-soft hover:shadow-medium transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span v-if="authStore.loading" class="mr-2">
                <LoadingSpinner iconClass="h-4 w-4 text-red-600" />
              </span>
              <LogoutIcon v-else iconClass="h-4 w-4 mr-2" />
              {{ authStore.loading ? "Logging out..." : "Logout" }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="mb-12 animate-fade-in">
        <div class="text-center">
          <div class="flex justify-center mb-6">
            <div
              class="p-6 bg-gradient-to-br from-accent-400 to-primary-500 rounded-3xl shadow-large animate-pulse-slow"
            >
              <CheckCircleIcon iconClass="h-12 w-12 text-white" />
            </div>
          </div>
          <h2
            class="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4"
          >
            Welcome to your Dashboard
          </h2>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
            You have successfully authenticated and now have access to your
            personalized dashboard with all the features you need.
          </p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up">
        <!-- Active Sessions -->
        <div class="card p-6 hover:scale-105">
          <div class="flex items-center">
            <div
              class="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-colored"
            >
              <UserIcon iconClass="h-6 w-6 text-white" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">
                Active Sessions
              </p>
              <p class="text-2xl font-bold text-neutral-900">1</p>
            </div>
          </div>
        </div>

        <!-- Account Status -->
        <div class="card p-6 hover:scale-105">
          <div class="flex items-center">
            <div
              class="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-colored"
            >
              <CheckCircleIcon iconClass="h-6 w-6 text-white" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">Account Status</p>
              <p class="text-2xl font-bold text-accent-600">Active</p>
            </div>
          </div>
        </div>

        <!-- Last Login -->
        <div class="card p-6 hover:scale-105">
          <div class="flex items-center">
            <div
              class="p-3 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-colored"
            >
              <ClockIcon iconClass="h-6 w-6 text-white" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">Last Login</p>
              <p class="text-2xl font-bold text-neutral-900">Now</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
        <!-- User Profile Card -->
        <div class="card p-8">
          <div class="flex items-center mb-6">
            <div
              class="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-colored"
            >
              <UserIcon iconClass="h-6 w-6 text-white" />
            </div>
            <h3 class="text-xl font-bold text-neutral-900 ml-4">
              Your Profile
            </h3>
          </div>

          <div v-if="authStore.user" class="space-y-6">
            <div
              class="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-200"
            >
              <div>
                <p class="text-sm font-medium text-neutral-500">Full Name</p>
                <p class="text-lg font-semibold text-neutral-900">
                  {{ authStore.user.name }}
                </p>
              </div>
              <UserIcon iconClass="h-8 w-8 text-neutral-400" />
            </div>

            <div
              class="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-200"
            >
              <div>
                <p class="text-sm font-medium text-neutral-500">
                  Email Address
                </p>
                <p class="text-lg font-semibold text-neutral-900">
                  {{ authStore.user.email }}
                </p>
              </div>
              <EmailIcon iconClass="h-8 w-8 text-neutral-400" />
            </div>

            <div
              class="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-200"
            >
              <div>
                <p class="text-sm font-medium text-neutral-500">User ID</p>
                <p
                  class="text-lg font-mono font-semibold text-neutral-900 break-all"
                >
                  {{ authStore.user.id }}
                </p>
              </div>
              <HashIcon iconClass="h-8 w-8 text-neutral-400" />
            </div>
          </div>
        </div>

        <!-- Quick Actions Card -->
        <div class="card p-8">
          <div class="flex items-center mb-6">
            <div
              class="p-3 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl shadow-colored"
            >
              <SettingsIcon iconClass="h-6 w-6 text-white" />
            </div>
            <h3 class="text-xl font-bold text-neutral-900 ml-4">
              Quick Actions
            </h3>
          </div>

          <div class="space-y-4">
            <button
              class="btn-secondary w-full flex items-center justify-center"
            >
              <SettingsIcon iconClass="h-5 w-5 mr-3" />
              Account Settings
            </button>

            <button
              class="btn-secondary w-full flex items-center justify-center"
            >
              <LockIcon iconClass="h-5 w-5 mr-3" />
              Change Password
            </button>

            <button
              class="btn-secondary w-full flex items-center justify-center"
            >
              <ChartBarIcon iconClass="h-5 w-5 mr-3" />
              View Analytics
            </button>

            <button
              class="btn-secondary w-full flex items-center justify-center"
            >
              <SupportIcon iconClass="h-5 w-5 mr-3" />
              Get Support
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Activity Card -->
      <div class="mt-8 card p-8 animate-slide-up">
        <div class="flex items-center mb-6">
          <div
            class="p-3 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl shadow-colored"
          >
            <ChartBarIcon iconClass="h-6 w-6 text-white" />
          </div>
          <h3 class="text-xl font-bold text-neutral-900 ml-4">
            Recent Activity
          </h3>
        </div>

        <div class="space-y-4">
          <div
            class="flex items-center p-4 bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl border border-accent-200"
          >
            <div class="h-2 w-2 bg-accent-500 rounded-full mr-4"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-neutral-900">
                Successfully signed in
              </p>
              <p class="text-xs text-neutral-500">Just now</p>
            </div>
            <CheckCircleIcon iconClass="h-5 w-5 text-accent-500" />
          </div>

          <div
            class="flex items-center p-4 bg-neutral-50 rounded-xl border border-neutral-200"
          >
            <div class="h-2 w-2 bg-primary-500 rounded-full mr-4"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-neutral-900">
                Account created
              </p>
              <p class="text-xs text-neutral-500">Recently</p>
            </div>
            <UserPlusIcon iconClass="h-5 w-5 text-primary-500" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async (): Promise<void> => {
  await authStore.logout();
  router.push("/signin");
};
</script>
