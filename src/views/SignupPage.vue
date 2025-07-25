<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link
            to="/signin"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            sign in to your existing account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.name }"
              placeholder="Full name"
              @blur="validateName"
              @input="clearFieldError('name')"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Email address"
              @blur="validateEmail"
              @input="clearFieldError('email')"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Password"
              @blur="validatePassword"
              @input="clearFieldError('password')"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
            <div class="mt-2 text-sm text-gray-600">
              <p>Password must contain:</p>
              <ul class="list-disc list-inside space-y-1">
                <li
                  :class="
                    passwordCriteria.length ? 'text-green-600' : 'text-red-600'
                  "
                >
                  At least 8 characters
                </li>
                <li
                  :class="
                    passwordCriteria.hasLetter
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  At least 1 letter
                </li>
                <li
                  :class="
                    passwordCriteria.hasNumber
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  At least 1 number
                </li>
                <li
                  :class="
                    passwordCriteria.hasSpecial
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  At least 1 special character
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="authStore.error" class="rounded-md bg-red-50 p-4">
          <p class="text-sm text-red-800">{{ authStore.error }}</p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading || !isFormValid"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="authStore.loading"
              class="absolute left-0 inset-y-0 flex items-center pl-3"
            >
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            {{ authStore.loading ? "Creating account..." : "Create account" }}
          </button>
        </div>
      </form>
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
