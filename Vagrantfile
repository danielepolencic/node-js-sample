# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.require_version ">= 1.6.3"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  if Vagrant.has_plugin?("vagrant-vbguest") then
    config.vbguest.auto_update = false
  end

  # config.vm.define "boot2docker-builder"
  config.vm.box = "yungsang/boot2docker"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.name = "test-boot2docker"
  end

  config.vm.network :private_network, type: "dhcp"
  config.vm.synced_folder ".", "/vagrant"
  config.vm.network "forwarded_port", guest: 5000, host: 5000

  # Fix busybox/udhcpc issue
  config.vm.provision :shell do |s|
    s.inline = <<-EOT
      if ! grep -qs ^nameserver /etc/resolv.conf; then
        sudo /sbin/udhcpc
      fi
      cat /etc/resolv.conf
    EOT
  end

  # Adjust datetime after suspend and resume
  config.vm.provision :shell do |s|
    s.inline = <<-EOT
      sudo /usr/local/bin/ntpclient -s -h pool.ntp.org
      date
    EOT
  end

#  config.vm.provision :docker do |d|
#    d.build_image "/vagrant/", args: "-t boot2docker"
#    d.run "boot2docker", args: "--rm", cmd: "> /vagrant/boot2docker.iso",
#      auto_assign_name: false, daemonize: false
#  end
end
