using Newtonsoft.Json;
using Projektarbete_Intake_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.Response
{
    public static class Message
    {
        public enum Field
        {
            EMAIL,
            PASSWORD,
            PASSWORD_AGAIN,
            NONE
        }

        private static string FieldAsString(Field field)
        {
            switch (field)
            {
                case Field.NONE: return null;
                case Field.PASSWORD: return "password-input";
                case Field.PASSWORD_AGAIN: return "password-again-input";
                default: return "email-input";
            }
        }
        public static string Response(string message, Field type)
        {
            MessageContainer returnMessage = new MessageContainer(message, FieldAsString(type));
            return JsonConvert.SerializeObject(returnMessage);
        }

        public static string Response(UserItem user)
        {
            MessageContainerUser returnMessage = new MessageContainerUser(user);
            return JsonConvert.SerializeObject(returnMessage);
        }

        public static string Response(FoodItemApi food)
        {
            MessageContainerFood returnMessage = new MessageContainerFood(food);
            return JsonConvert.SerializeObject(returnMessage);
        }

        private class MessageContainer
        {
            public string message { get; set; }
            public string field { get; set; }

            public MessageContainer(string message, string field)
            {
                this.message = message;
                this.field = field;
            }
        }

        private class MessageContainerUser
        {
            public UserItem user { get; set; }

            public MessageContainerUser(UserItem user)
            {
                this.user = user;
            }
        }

        private class MessageContainerFood
        {
            public FoodItemApi food { get; set; }

            public MessageContainerFood(FoodItemApi food)
            {
                this.food = food;
            }
        }
    }

    
}
