require 'rake/rdoctask'
require 'rake/packagetask'
require 'ows_tasks'

PKG_VERSION = '1.0'

task :applet => 'json-example.swf'

Rake::PackageTask.new("openlaszlo-json", PKG_VERSION) do |p|
  p.package_files.include('*.lzx', '*.js', '*/*.json', 'README', 'MIT-LICENSE')
  p.need_zip = true
end

task :zip => :package do
  cp "pkg/openlaszlo-json-#{PKG_VERSION}.zip", '.'
end

task 'index.php' => ['README', 'Rakefile'] do |t|
  jsrdoc 'README', t.name, nil, false
end

task :doc => 'index.php'
