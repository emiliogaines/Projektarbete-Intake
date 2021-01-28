using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Projektarbete_Intake_Backend.Controllers;
using Projektarbete_Intake_Backend.Models;
using Projektarbete_Intake_Backend.Response;
using System;
using System.Threading.Tasks;

namespace BackendTests
{
    [TestClass]
    public class UnitTests : DbTest
    {
        [TestMethod]
        public async Task ShouldRegisterWhenConditionsAreMet()
        {
            using (var context = new IntakeContext(ContextOptions))
            {
                // Arrange
                RegisterController registerController = new RegisterController(context);
                UserController userController = new UserController(context);

                UserRegisterItem incorrect_email_user = new UserRegisterItem
                {
                    Id = 0,
                    Email = "test@test",
                    Password = "testpwd123",
                    PasswordAgain = "testpwd123"
                };

                UserRegisterItem incorrect_password_user = new UserRegisterItem
                {
                    Id = 1,
                    Email = "test@test.test",
                    Password = "test",
                    PasswordAgain = "test"
                };

                UserRegisterItem non_matching_password_user = new UserRegisterItem
                {
                    Id = 2,
                    Email = "test@test.test",
                    Password = "test123",
                    PasswordAgain = "test"
                };

                UserRegisterItem correct_user = new UserRegisterItem
                {
                    Id = 3,
                    Email = "test@test.test",
                    Password = "testpwd123",
                    PasswordAgain = "testpwd123"
                };



                // Act
                var should_fail_incorrect_email = await registerController.Post(incorrect_email_user);
                var should_fail_incorrect_password = await registerController.Post(incorrect_password_user);
                var should_fail_non_matching_password = await registerController.Post(non_matching_password_user);
                var should_succeed = await registerController.Post(correct_user);

                // Assert
                Assert.IsTrue(should_succeed.Result is OkObjectResult); // Should succeed
                Assert.IsTrue(should_fail_incorrect_email.Result is BadRequestObjectResult); // Should fail because email is invalid (no dot)
                Assert.IsTrue(should_fail_incorrect_password.Result is BadRequestObjectResult); // Should fail because password is invalid (not long enough)
                Assert.IsTrue(should_fail_non_matching_password.Result is BadRequestObjectResult); // Should fail because passwords do not match
            }
        }

        [TestMethod]
        public async Task ShouldLoginUser()
        {
            using (var context = new IntakeContext(ContextOptions))
            {
                // Arrange
                RegisterController registerController = new RegisterController(context);
                LoginController controller = new LoginController(context);

                UserRegisterItem mock_user = new UserRegisterItem
                {
                    Id = 0,
                    Email = "test@test.test",
                    Password = "testpwd123",
                    PasswordAgain = "testpwd123"
                };

                // Act
                await registerController.Post(mock_user);

                var login_success = await controller.Post(new UserLoginItem
                {
                    Email = mock_user.Email,
                    Password = mock_user.Password
                });

                var login_fail = await controller.Post(new UserLoginItem
                {
                    Email = "incorrect_email",
                    Password = mock_user.Password
                });

                // Assert
                Assert.IsTrue(login_success.Result is OkObjectResult); // Login should succeed
                Assert.IsTrue(login_fail.Result is NotFoundObjectResult); // Login should fail
            }
        }

        [TestMethod]
        public async Task ShouldPostAndDeleteItem()
        {
            using (var context = new IntakeContext(ContextOptions))
            {
                // Arrange
                var controller = new FoodController(context);
                var registerController = new RegisterController(context);
                var loginController = new LoginController(context);

                // Act
                UserRegisterItem mock_user = new UserRegisterItem
                {
                    Email = "test@test.test",
                    Password = "testpwd123",
                    PasswordAgain = "testpwd123"
                };

                await registerController.Post(mock_user);
                var fetched_mock_user = loginController.FetchUser(mock_user.Email);

                FoodItemSent mock_item_success = new FoodItemSent
                {
                    Id = 47,
                    Email = fetched_mock_user.Email,
                    Hash = fetched_mock_user.Hash,
                    Name = "TestItem",
                    Calories = 47
                };

                FoodItemSent mock_item_fail = new FoodItemSent
                {
                    Id = 48,
                    Email = fetched_mock_user.Email,
                    Hash = "",
                    Name = "TestItem",
                    Calories = 47
                };

                UserVerifyItem verified_mock_user = new UserVerifyItem
                {
                    Email = fetched_mock_user.Email,
                    Hash = fetched_mock_user.Hash
                };


                var post_mock_item_success = await controller.PostFoodItem(mock_item_success);
                var post_mock_item_fail = await controller.PostFoodItem(mock_item_fail);

                var delete_mock_item_success = await controller.DeleteFoodItem(mock_item_success.Id, verified_mock_user);
                var delete_mock_item_fail = await controller.DeleteFoodItem(mock_item_fail.Id, verified_mock_user);

                // Assert
                Assert.IsTrue(post_mock_item_success.Result is OkObjectResult); // Should succeed
                Assert.IsTrue(post_mock_item_fail.Result is BadRequestObjectResult); // Should fail because hash does not match user

                Assert.IsTrue(delete_mock_item_success.Result is OkResult); // Should succeed
                Assert.IsTrue(delete_mock_item_fail.Result is NotFoundResult); // Should fail because item does not exist
            }
        }


        [TestMethod]
        public async Task ShouldGetItems()
        {
            using (var context = new IntakeContext(ContextOptions))
            {
                // Arrange
                var controller = new FoodController(context);

                // Act
                FoodItem[] items = { controller.GetFoodItem(1).Result.Value, controller.GetFoodItem(2).Result.Value, controller.GetFoodItem(3).Result.Value };

                // Assert
                Assert.AreEqual(3, items.Length);
                Assert.AreEqual("Pizza", items[0].Name);
                Assert.AreEqual("Taco", items[1].Name);
                Assert.AreEqual("Monster Energy Drink", items[2].Name);
            }
        }
    }
}
