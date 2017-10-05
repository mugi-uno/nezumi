require 'spec_helper'

RSpec.describe 'Sample' do
  describe 'forms' do
    before do
      visit('/sample')
    end

    it 'sample specs' do
      fill_in 'Name', with: 'name'
      fill_in 'Age', with: 'age'
      fill_in 'Textarea', with: 'textarea'
      find(:xpath, 'id("new_sample")/div[4]').click
      fill_in 'idform', with: 'id'
      find('.foo.bar.baz').set('class')
      find(:xpath, 'id("new_sample")/div[6]/input[1]').set('xpath')
      find('div', text: /\Aradio button with label\z/).click
      choose 'Apple'
      choose 'Orange'
      choose 'Peach'
      find(:xpath, 'id("new_sample")/div[8]').click
      find(:xpath, 'id("new_sample")/div[8]').click
      choose 'radio1'
      find('.radio2').set(true)
      find(:xpath, 'id("new_sample")/div[8]/input[3]').set(true)
      find('div', text: /\Acheckbox with label\z/).click
      check 'Question1'
      check 'Question2'
      check 'Question3'
      uncheck 'Question3'
      uncheck 'Question2'
      uncheck 'Question1'
      check 'check1'
      find('.check2').set(true)
      find(:xpath, 'id("new_sample")/div[10]/input[3]').set(true)
      find('div', text: /\Aselectbox by form helper\z/).click
      select '紅茶', from: 'Drink'
      select '紅茶', from: 'select1'
      find('.select2').find(:option, '紅茶').select_option
      find(:xpath, 'id("new_sample")/div[12]/select[3]').find(:option, '紅茶').select_option
      click_link 'sample button'
      click_link 'linkid'
      find('.linkclass').click
      find(:xpath, 'id("new_sample")/div[13]/a[4]').click
      click_button 'sample button'
      click_button 'buttonid'
      find('.buttonclass').click
      find(:xpath, 'id("new_sample")/div[14]/button[4]').click
      find('.btn.btn-large.btn-primary').click
    end
  end
end
