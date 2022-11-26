<template>
    <div class="card">
        <div class="size-wrapper">
            <tooltip :isTooltipActive="passwordLength == 0" :style="{ '--i': '42px' }">
                Introduce un tamaño
            </tooltip>
            <label>
                Caracteres
                <input type="number" placeholder="Size" v-model="passwordLength" />
            </label>
        </div>
        <div class="checkbox-wrappper">
            <label>Mayúsculas<input type="checkbox" v-model="uppercase" /></label>
            <label>Minúsculas<input type="checkbox" v-model="lowercase" /></label>
            <label>Números<input type="checkbox" v-model="numbers" /></label>
            <label>Símbolos<input type="checkbox" v-model="simbols" /></label>
        </div>
        <div class="input-wrapper">
            <div class="lock-icon">
                <i class="bx bx-lock-alt"></i>
            </div>
            <input
                :style="{ '--ci': passwordStrength }"
                type="text"
                readonly="true"
                v-model="password"
            />
            <div class="copy-icon" @click="copyPassWord">
                <tooltip :isTooltipActive="password != ''" :style="{ '--i': '12px' }">
                    Copiar al portapapeles
                </tooltip>
                <i class="bx bx-copy"></i>
            </div>
        </div>
        <div class="button-wrapper">
            <button id="btnGen" @click="genPass">Generar Password</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from "vue";
    import { copyText } from "vue3-clipboard";
    import tooltip from "./tootltip.vue";
    import { useAnimations } from "../composables/animations.composable";

    const emit = defineEmits(["isModalActive"]);
    const animate = useAnimations();

    const uppercase = ref(true);
    const lowercase = ref(true);
    const numbers = ref(false);
    const simbols = ref(false);

    const characterSet = ref("");
    const passwordLength = ref(12);
    const password = ref("");

    const copyPassWord = () => {
        copyText(password.value, undefined, (error) => {
            if (error) {
                alert("No se ha podido copiar nada al portapales");
                console.log(error);
            } else {
                emit("isModalActive", {
                    color: "#2eac68",
                    icon: "bx bxs-like",
                    title: "¡LISTO!",
                    message: "La contraseña se ha copiado con exito en el portapapeles",
                });
                password.value = "";
            }
        });
    };

    const genPass = () => {
        if (passwordLength.value > 30) {
            emit("isModalActive", {
                color: "#9d2b38",
                icon: "bx bx-shield-plus",
                title: "¡Mmmmm!",
                message:
                    "¿De verdad necesitas una contreña tan larga?. Creo que con 30 caracteres seria mas que suficiente, ¿no crees?",
            });
            passwordLength.value = 30;
            return;
        }
        characterSet.value = "";
        password.value = "";

        if (uppercase.value) {
            characterSet.value += "ABCDEFGHJKLMNPQRSTUVWXYZ";
        }
        if (lowercase.value) {
            characterSet.value += "abcdefghijkmnopqrstuvwxyz";
        }
        if (numbers.value) {
            characterSet.value += "123456789";
        }
        if (simbols.value) {
            characterSet.value += "!·$%&/()=?¿^*{}[]<>";
        }

        for (let i = 0; i < passwordLength.value; i++) {
            password.value += characterSet.value.charAt(
                Math.floor(Math.random() * characterSet.value.length)
            );
        }
    };

    const passwordStrength = computed(() => {
        if (password.value.length < 6) return "#9d2b38";
        if (password.value.length >= 6 && password.value.length <= 8) return "#cba312";
        if (password.value.length > 8) return "#2eac68";
    });

    window.addEventListener("keypress", (event) => {
        if (event.key == "Enter") {
            document.getElementById("btnGen").click();
        }
    });

    onMounted(() => {
        animate.onEnter();
    });
</script>
