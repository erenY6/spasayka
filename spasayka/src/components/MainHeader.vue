<template>
  <header
    class="font-[Signate_Grotesk] border-b-black border-b-1 px-8 py-3 flex items-center justify-between w-full"
  >
    <div class="">
      <router-link
        to="/"
        class="flex justify-center items-center bg-[#d0d075] min-w-[115px] min-h-[40px] rounded-[30px]"
      >
        <img src="@/assets/logo.svg" alt="Логотип" class="h-6 mr-2" />
        СпасайКа
      </router-link>
    </div>

    <nav class="flex space-x-6">
      <router-link to="/about">О нас</router-link>
      <router-link to="/ads">Объявления</router-link>
      <router-link to="/volunteer">Стать волонтером</router-link>
      <router-link to="/shelters">Приюты</router-link>
      <router-link to="/map">Карта</router-link>
    </nav>

    <router-link
      to="/auth"
      class="flex justify-center bg-[#d0d075] min-w-[160px] min-h-[40px] items-center rounded-[30px]"
    >
      Регистрация / Вход
    </router-link>
  </header>
</template>
