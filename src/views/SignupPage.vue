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
        <div class="flex justify-center mb-6">
          <div
            class="p-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-colored"
          >
            <UserPlusIcon iconClass="h-8 w-8 text-white" />
          </div>
        </div>
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
        >
          Create your account
        </h2>
        <p class="mt-3 text-neutral-600">
          Join us and start your journey today
        </p>
        <p class="mt-2 text-sm text-neutral-500">
          Already have an account?
          <router-link
            to="/signin"
            class="font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-200 hover:underline"
          >
            Sign in here
          </router-link>
        </p>
      </div>

      <!-- Form Card -->
      <div class="glass-card p-8 animate-slide-up">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Name Field -->
          <div class="space-y-2">
            <label
              for="name"
              class="block text-sm font-semibold text-neutral-700"
            >
              Full Name
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <UserIcon iconClass="h-5 w-5 text-neutral-400" />
              </div>
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                required
                class="input-field pl-10"
                :class="{ 'ring-2 ring-red-400 border-red-400': errors.name }"
                placeholder="Enter your full name"
                @blur="validateName"
                @input="clearFieldError('name')"
              />
            </div>
            <transition name="slide-down">
              <p
                v-if="errors.name"
                class="text-sm text-red-600 flex items-center"
              >
                <ErrorIcon iconClass="h-4 w-4 mr-1" />
                {{ errors.name }}
              </p>
            </transition>
          </div>

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
                placeholder="Create a secure password"
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

            <!-- Password Strength Indicator -->
            <div class="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
              <p class="text-sm font-medium text-neutral-700 mb-3">
                Password requirements:
              </p>
              <div class="grid grid-cols-2 gap-3">
                <div class="flex items-center text-sm">
                  <CheckCircleIcon
                    :iconClass="`h-4 w-4 mr-2 ${passwordCriteria.length ? 'text-accent-500' : 'text-neutral-300'}`"
                  />
                  <span
                    :class="
                      passwordCriteria.length
                        ? 'text-accent-600 font-medium'
                        : 'text-neutral-500'
                    "
                  >
                    8+ characters
                  </span>
                </div>
                <div class="flex items-center text-sm">
                  <CheckCircleIcon
                    :iconClass="`h-4 w-4 mr-2 ${passwordCriteria.hasLetter ? 'text-accent-500' : 'text-neutral-300'}`"
                  />
                  <span
                    :class="
                      passwordCriteria.hasLetter
                        ? 'text-accent-600 font-medium'
                        : 'text-neutral-500'
                    "
                  >
                    1+ letter
                  </span>
                </div>
                <div class="flex items-center text-sm">
                  <CheckCircleIcon
                    :iconClass="`h-4 w-4 mr-2 ${passwordCriteria.hasNumber ? 'text-accent-500' : 'text-neutral-300'}`"
                  />
                  <span
                    :class="
                      passwordCriteria.hasNumber
                        ? 'text-accent-600 font-medium'
                        : 'text-neutral-500'
                    "
                  >
                    1+ number
                  </span>
                </div>
                <div class="flex items-center text-sm">
                  <CheckCircleIcon
                    :iconClass="`h-4 w-4 mr-2 ${passwordCriteria.hasSpecial ? 'text-accent-500' : 'text-neutral-300'}`"
                  />
                  <span
                    :class="
                      passwordCriteria.hasSpecial
                        ? 'text-accent-600 font-medium'
                        : 'text-neutral-500'
                    "
                  >
                    1+ special char
                  </span>
                </div>
              </div>
            </div>
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
              {{ authStore.loading ? "Creating account..." : "Create account" }}
            </span>
          </button>
        </form>
      </div>

      <!-- Footer -->
      <div class="text-center text-sm text-neutral-500">
        <p>By creating an account, you agree to our</p>
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

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const errors = reactive({
  name: "",
  email: "",
  password: "",
});

// Password validation criteria
const passwordCriteria = computed(() => ({
  length: form.password.length >= 8,
  hasLetter: /[a-zA-Z]/.test(form.password),
  hasNumber: /\d/.test(form.password),
  hasSpecial: /[@$!%*?&]/.test(form.password),
}));

const isFormValid = computed(() => {
  return (
    form.name.length >= 3 &&
    isValidEmail(form.email) &&
    passwordCriteria.value.length &&
    passwordCriteria.value.hasLetter &&
    passwordCriteria.value.hasNumber &&
    passwordCriteria.value.hasSpecial &&
    !errors.name &&
    !errors.email &&
    !errors.password
  );
});

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (): void => {
  if (form.name.length < 3) {
    errors.name = "Name must be at least 3 characters long";
  } else {
    errors.name = "";
  }
};

const validateEmail = (): void => {
  if (!isValidEmail(form.email)) {
    errors.email = "Please provide a valid email address";
  } else {
    errors.email = "";
  }
};

const validatePassword = (): void => {
  if (!passwordCriteria.value.length) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!passwordCriteria.value.hasLetter) {
    errors.password = "Password must contain at least 1 letter";
  } else if (!passwordCriteria.value.hasNumber) {
    errors.password = "Password must contain at least 1 number";
  } else if (!passwordCriteria.value.hasSpecial) {
    errors.password = "Password must contain at least 1 special character";
  } else {
    errors.password = "";
  }
};

const clearFieldError = (field: keyof typeof errors): void => {
  errors[field] = "";
};

const handleSubmit = async (): Promise<void> => {
  // Validate all fields
  validateName();
  validateEmail();
  validatePassword();

  if (!isFormValid.value) {
    return;
  }

  const success = await authStore.signup(form);
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
