# https://github.com/jekyll/jekyll/pull/3723#issuecomment-127459530 #
module Jekyll
  class Collection
    def relative_directory
      @relative_directory ||= (metadata['relative_directory'] && site.in_source_dir(metadata['relative_directory']) ||  "_#{label}")
    end
  end
end
