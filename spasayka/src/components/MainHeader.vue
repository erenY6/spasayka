<template>
  <header
    class="sticky top-0 left-0 w-full z-50 bg-white border-b border-black px-12 py-3 flex items-center text-[17px] font-[Signate_Grotesk]"
  >
    <div class="flex items-center gap-8 flex-1">
      <router-link
        to="/"
        class="flex items-center bg-[#d0d075] min-w-[115px] px-10 min-h-[40px] rounded-full"
      >
        <div class="flex px-4 gap-2">
          <img src="@/assets/logo.svg" alt="Логотип" class="h-6 mr-2" />
          СпасайКа
        </div>
      </router-link>

      <nav class="flex gap-6">
        <router-link to="/about">О нас</router-link>
        <router-link to="/ads">Объявления</router-link>
        <router-link to="/volunteer">Стать волонтером</router-link>
        <router-link to="/shelters">Приюты</router-link>
        <router-link to="/map">Карта</router-link>
      </nav>
    </div>

    <router-link
      to="/auth"
      class="flex items-center justify-center bg-[#d0d075] min-w-[160px] min-h-[40px] rounded-full"
    >
      <div class="px-4">Регистрация / Вход</div>
    </router-link>
  </header>
</template>
