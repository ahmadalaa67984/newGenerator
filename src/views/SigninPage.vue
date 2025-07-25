<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-hero-pattern opacity-30"></div>
    <div
      class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-300/20 to-secondary-300/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent-300/20 to-primary-300/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"
    ></div>

    <div class="max-w-md w-full space-y-8 relative z-10 animate-fade-in">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center mb-6"></div>
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
        >
          Welcome back
        </h2>
        <p class="mt-3 text-neutral-600">Sign in to continue your journey</p>
        <p class="mt-2 text-sm text-neutral-500">
          Don't have an account?
          <router-link
            to="/signup"
            class="font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-200 hover:underline"
          >
            Create one here
          </router-link>
        </p>
      </div>

      <!-- Form Card -->
      <div class="glass-card p-8 animate-slide-up">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Email Field -->
          <div class="space-y-2">
            <label
              for="email"
              class="block text-sm font-semibold text-neutral-700"
            >
              Email Address
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <EmailIcon iconClass="h-5 w-5 text-neutral-400" />
              </div>
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                required
                class="input-field pl-10"
                :class="{ 'ring-2 ring-red-400 border-red-400': errors.email }"
                placeholder="Enter your email address"
                @blur="validateEmail"
                @input="clearFieldError('email')"
              />
            </div>
            <transition name="slide-down">
              <p
                v-if="errors.email"
                class="text-sm text-red-600 flex items-center"
              >
                <ErrorIcon iconClass="h-4 w-4 mr-1" />
                {{ errors.email }}
              </p>
            </transition>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label
              for="password"
              class="block text-sm font-semibold text-neutral-700"
            >
              Password
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <LockIcon iconClass="h-5 w-5 text-neutral-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                required
                class="input-field pl-10"
                :class="{
                  'ring-2 ring-red-400 border-red-400': errors.password,
                }"
                placeholder="Enter your password"
                @blur="validatePassword"
                @input="clearFieldError('password')"
              />
            </div>
            <transition name="slide-down">
              <p
                v-if="errors.password"
                class="text-sm text-red-600 flex items-center"
              >
                <ErrorIcon iconClass="h-4 w-4 mr-1" />
                {{ errors.password }}
              </p>
            </transition>
          </div>

          <!-- Error Message -->
          <transition name="slide-down">
            <div
              v-if="authStore.error"
              class="bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <div class="flex items-center">
                <ErrorIcon iconClass="h-5 w-5 text-red-500 mr-3" />
                <p class="text-sm font-medium text-red-800">
                  {{ authStore.error }}
                </p>
              </div>
            </div>
          </transition>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.loading || !isFormValid"
            class="btn-primary w-full relative overflow-hidden group"
          >
            <span
              v-if="authStore.loading"
              class="absolute inset-0 flex items-center justify-center"
            >
              <LoadingSpinner iconClass="h-5 w-5 text-white" />
            </span>
            <span :class="{ 'opacity-0': authStore.loading }">
              {{ authStore.loading ? "Signing in..." : "Sign in" }}
            </span>
          </button>
        </form>
      </div>

      <!-- Footer -->
      <div class="text-center text-sm text-neutral-500">
        <p>By signing in, you agree to our</p>
        <div class="flex justify-center space-x-4 mt-1">
          <a
            href="#"
            class="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >Terms of Service</a
          >
          <span>&middot;</span>
          <a
            href="#"
            class="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >Privacy Policy</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { LockIcon, LoadingSpinner, EmailIcon, ErrorIcon } from "@/assets/icons";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const isFormValid = computed(() => {
  return (
    isValidEmail(form.email) &&
    form.password.length > 0 &&
    !errors.email &&
    !errors.password
  );
});

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateEmail = (): void => {
  if (!isValidEmail(form.email)) {
    errors.email = "Please provide a valid email address";
  } else {
    errors.email = "";
  }
};

const validatePassword = (): void => {
  if (form.password.length === 0) {
    errors.password = "Password is required";
  } else {
    errors.password = "";
  }
};

const clearFieldError = (field: keyof typeof errors): void => {
  errors[field] = "";
};

const handleSubmit = async (): Promise<void> => {
  // Validate all fields
  validateEmail();
  validatePassword();

  if (!isFormValid.value) {
    return;
  }

  const success = await authStore.signin(form);
  if (success) {
    router.push("/app");
  }
};

onMounted(() => {
  // Clear any previous errors when component mounts
  authStore.clearError();
});
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
