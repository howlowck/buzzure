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
  name     = "rg-buzzure-${var.environment}"
  location = "eastus2"
}

resource "azurerm_service_plan" "buzzure" {
  name                = "buzzure-${var.environment}"
  resource_group_name = azurerm_resource_group.buzzure.name
  location            = azurerm_resource_group.buzzure.location
  os_type             = "Linux"
  sku_name            = "B2"
}

resource "azurerm_linux_web_app" "buzzure" {
  name                = "buzzure-${var.environment}"
  resource_group_name = azurerm_resource_group.buzzure.name
  location            = azurerm_service_plan.buzzure.location
  service_plan_id     = azurerm_service_plan.buzzure.id

  site_config {}
}

resource "azurerm_storage_account" "buzzure" {
  name                     = "sabuzzure${var.environment}"
  resource_group_name      = azurerm_resource_group.buzzure.name
  location                 = azurerm_resource_group.buzzure.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_table" "buzzure" {
  name                 = "buzzure-table-${var.environment}"
  storage_account_name = azurerm_storage_account.buzzure.name
}
