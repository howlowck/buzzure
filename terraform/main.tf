terraform {
  backend "azurerm" {}
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.90.0"
    }
  }
}

provider "azurerm" {
  features {}
}

data "azurerm_client_config" "current" {}

#Create Resource Group
resource "azurerm_resource_group" "buzzure" {
  name     = "rg-buzzure"
  location = "eastus2"
}

resource "azurerm_service_plan" "buzzure" {
  name                = "buzzure"
  resource_group_name = azurerm_resource_group.buzzure.name
  location            = azurerm_resource_group.buzzure.location
  os_type             = "Linux"
  sku_name            = "B2"
}

resource "azurerm_linux_web_app" "buzzure" {
  name                = "buzzure"
  resource_group_name = azurerm_resource_group.buzzure.name
  location            = azurerm_service_plan.buzzure.location
  service_plan_id     = azurerm_service_plan.buzzure.id

  site_config {}
}
